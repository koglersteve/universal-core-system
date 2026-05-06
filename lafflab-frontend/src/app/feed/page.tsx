export const dynamic = "force-dynamic";

"use client";

import { useEffect, useRef, useState } from "react";
import { LaffLabApi } from "@/lib/LaffLabApi";
import type { Post } from "@/types/jokes";
import JokeCard from "@/components/JokeCard";
import LoadingState from "@/components/ui/LoadingState";

export default function FeedPage() {
  const [items, setItems] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);

  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

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

  useEffect(() => {
    loadMore();
  }, []);

  useEffect(() => {
    function onScroll() {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 200
      ) {
        loadMore();
      }
    }

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [page]);

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
          <JokeCard post={post} />
        </div>
      ))}

      {loading && <LoadingState message="Loading…" />}
    </div>
  );
}
