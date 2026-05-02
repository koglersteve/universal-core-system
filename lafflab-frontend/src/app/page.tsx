"use client";

import { useEffect, useRef, useState } from "react";
import { LaffLabApi } from "@/lib/LaffLabApi";
import type { Post } from "@/types/jokes";
import JokeCard from "@/components/JokeCard";

const PAGE_SIZE = 10;

export default function HomeFeedPage() {
  const [items, setItems] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const touchStartY = useRef<number | null>(null);
  const pulling = useRef(false);

  async function loadInitial() {
    const all = await LaffLabApi.getPosts();
    const sorted = [...all].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    );
    const first = sorted.slice(0, PAGE_SIZE);
    setItems(first);
    setPage(2);
    setActiveIndex(0);
  }

  async function loadMore() {
    if (loadingMore) return;
    setLoadingMore(true);

    const all = await LaffLabApi.getPosts();
    const sorted = [...all].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    );

    const chunk = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
    if (chunk.length > 0) {
      setItems((prev) => [...prev, ...chunk]);
      setPage((p) => p + 1);
    }

    setLoadingMore(false);
  }

  async function refresh() {
    setRefreshing(true);
    await loadInitial();
    setRefreshing(false);
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function scrollToIndex(index: number) {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const child = container.children[index] as HTMLElement | undefined;
    if (!child) return;
    container.scrollTo({
      top: child.offsetTop,
      behavior: "smooth",
    });
  }

  // Initial preload
  useEffect(() => {
    loadInitial();
  }, []);

  // Auto‑advance when a joke "finishes"
  useEffect(() => {
    if (!items[activeIndex]) return;

    const post = items[activeIndex] as any;
    const durationSeconds =
      typeof post.duration === "number" && post.duration > 0
        ? post.duration
        : 8;

    const timer = setTimeout(() => {
      const nextIndex = activeIndex + 1;
      if (nextIndex < items.length) {
        setActiveIndex(nextIndex);
        scrollToIndex(nextIndex);
      } else {
        // End of loaded items: try to load more, then advance if possible
        loadMore().then(() => {
          setTimeout(() => {
            setActiveIndex((idx) =>
              idx + 1 < items.length ? idx + 1 : idx
            );
            scrollToIndex(activeIndex + 1);
          }, 200);
        });
      }
    }, durationSeconds * 1000);

    return () => clearTimeout(timer);
  }, [activeIndex, items]);

  // Track active index based on scroll position
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    function onScroll() {
      const { scrollTop, clientHeight } = container;
      const index = Math.round(scrollTop / clientHeight);
      if (index !== activeIndex && index >= 0 && index < items.length) {
        setActiveIndex(index);
      }

      // Load more when near bottom
      if (
        scrollTop + clientHeight >=
        container.scrollHeight - clientHeight * 0.5
      ) {
        loadMore();
      }
    }

    container.addEventListener("scroll", onScroll);
    return () => container.removeEventListener("scroll", onScroll);
  }, [activeIndex, items.length]);

  // Pull‑to‑refresh handlers
  function handleTouchStart(e: React.TouchEvent<HTMLDivElement>) {
    if (!scrollRef.current) return;
    if (scrollRef.current.scrollTop === 0) {
      touchStartY.current = e.touches[0].clientY;
      pulling.current = true;
    }
  }

  function handleTouchMove(e: React.TouchEvent<HTMLDivElement>) {
    if (!pulling.current || touchStartY.current == null) return;
    const delta = e.touches[0].clientY - touchStartY.current;
    if (delta > 80 && !refreshing) {
      refresh();
      pulling.current = false;
      touchStartY.current = null;
    }
  }

  function handleTouchEnd() {
    pulling.current = false;
    touchStartY.current = null;
  }

  return (
    <div className="h-screen flex flex-col bg-black text-white">
      <div className="h-10 flex items-center justify-center text-xs text-white/70 border-b border-white/10 bg-black/80 backdrop-blur">
        {refreshing ? "Refreshing…" : "Pull down to refresh · LaffLab"}
      </div>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-scroll snap-y snap-mandatory"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {items.map((post, index) => (
          <div
            key={post.id}
            className="h-screen snap-start flex items-center justify-center px-2"
          >
            <div className="w-full max-w-md">
              <JokeCard post={post} />
            </div>
          </div>
        ))}

        {loadingMore && (
          <div className="h-20 flex items-center justify-center text-sm text-white/60">
            Loading more…
          </div>
        )}
      </div>
    </div>
  );
}
