"use client";

import { useEffect, useRef, useState } from "react";
import { LaffLabApi } from "@/lib/LaffLabApi";
import type { Post } from "@/types/jokes";
import JokeCard from "@/components/JokeCard";
import { JokeCardSkeleton } from "@/components/JokeCardSkeleton";
import { EmptyState, EmptyFeedIcon } from "@/components/ui/EmptyState";

const PAGE_SIZE = 10;

export default function HomeFeedPage() {
  const [items, setItems] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const touchStartY = useRef<number | null>(null);
  const pulling = useRef(false);

  async function loadInitial() {
    setLoadingInitial(true);

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

    setLoadingInitial(false);
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

  useEffect(() => {
    loadInitial();
  }, []);

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

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    function onScroll() {
      if (!scrollRef.current) return;
      const el = scrollRef.current;

      const scrollTop = el.scrollTop;
      const clientHeight = el.clientHeight;

      const index = Math.round(scrollTop / clientHeight);

      if (index !== activeIndex && index >= 0 && index < items.length) {
        setActiveIndex(index);
      }

      if (
        scrollTop + clientHeight >=
        el.scrollHeight - clientHeight * 0.5
      ) {
        loadMore();
      }
    }

    container.addEventListener("scroll", onScroll);
    return () => container.removeEventListener("scroll", onScroll);
  }, [activeIndex, items.length]);

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

  const menuItems = [
    { label: "Creator Dashboard", href: "/creator" },
    { label: "Upload", href: "/upload" },
    { label: "Favorites", href: "/favorites" },
    { label: "History", href: "/history" },
    { label: "Settings", href: "/settings" },
  ];

  const showEmptyFeed = !loadingInitial && items.length === 0;

  return (
    <div className="h-screen flex flex-col bg-black text-white page-shell">
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="p-2 rounded-full bg-white/10 border border-white/20 backdrop-blur hover:bg-white/20 transition-soft"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="fixed top-0 right-0 w-56 bg-black/90 border-l border-white/10 backdrop-blur z-40 p-4 space-y-3 animate-slideDown">
          {menuItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="block px-3 py-2 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-white/90 transition-soft"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}

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
        {loadingInitial ? (
          <div className="space-y-4 p-4">
            {[...Array(6)].map((_, i) => (
              <JokeCardSkeleton key={i} />
            ))}
          </div>
        ) : showEmptyFeed ? (
          <EmptyState
            title="No posts available"
            subtitle="Check back later for new jokes."
            icon={EmptyFeedIcon}
          />
        ) : (
          <div className="animate-fadeIn">
            {items.map((post) => (
              <div
                key={post.id}
                className="h-screen snap-start flex items-center justify-center px-2"
              >
                <div className="w-full max-w-md">
                  <JokeCard post={post} />
                </div>
              </div>
            ))}
          </div>
        )}

        {loadingMore && (
          <div className="h-20 flex items-center justify-center text-sm text-white/60">
            Loading more…
          </div>
        )}
      </div>
    </div>
  );
}
