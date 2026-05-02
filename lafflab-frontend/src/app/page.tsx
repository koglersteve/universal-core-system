"use client";

import { useEffect, useRef, useState } from "react";
import { LaffLabApi } from "@/lib/api";
import type { Post } from "@/types/jokes";
import JokeCard from "@/components/JokeCard";
import { motion } from "framer-motion";

export default function HomeFeedPage() {
  const [items, setItems] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);

  // Scroll snapping refs
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Infinite scroll sentinel
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  async function loadMore() {
    setLoading(true);

    const all = await LaffLabApi.getPosts();
    const sorted = [...all].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    );

    const chunk = sorted.slice((page - 1) * 10, page * 10);

    setItems((prev) => [...prev, ...chunk]);
    setPage((p) => p + 1);
    setLoading(false);
  }

  // Initial load
  useEffect(() => {
    loadMore();
  }, []);

  // Infinite scroll via IntersectionObserver
  useEffect(() => {
    if (!sentinelRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(sentinelRef.current);

    return () => observer.disconnect();
  }, [sentinelRef.current, page]);

  function scrollToIndex(index: number) {
    const el = itemRefs.current[index];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      setActiveIndex(index);
    }
  }

  return (
    <div className="space-y-6">
      <div className="sticky top-0 z-30 bg-brand-dark/80 backdrop-blur border-b border-white/10 p-3 text-center text-sm text-white">
        Sponsored: Upgrade your day with a laugh 😄
      </div>

      {items.map((post, index) => (
        <div
          key={post.id}
          ref={(el) => {
            itemRefs.current[index] = el;
          }}
          className="space-y-3"
        >
          {index !== 0 && index % 8 === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="p-3 text-center text-sm bg-white/10 border border-white/20 rounded-xl backdrop-blur"
            >
              Ad Space — Promote your brand here
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <JokeCard
              post={post}
              active={index === activeIndex}
            />
          </motion.div>
        </div>
      ))}

      {/* Infinite scroll sentinel */}
      <div ref={sentinelRef} className="h-1" />

      {loading && (
        <p className="text-center opacity-70 pb-10">Loading…</p>
      )}
    </div>
  );
}
