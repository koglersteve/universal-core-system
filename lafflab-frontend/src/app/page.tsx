"use client";

import { useEffect, useRef, useState } from "react";
import { LaffLabApi } from "@/lib/LaffLabApi";
import type { Post } from "@/types/jokes";
import JokeCard from "@/components/JokeCard";
import { JokeCardSkeleton } from "@/components/JokeCardSkeleton";
import { EmptyState, EmptyFeedIcon } from "@/components/ui/EmptyState";

import NotificationToast from "@/components/notifications/NotificationToast";
import { useNotificationInbox } from "@/hooks/useNotificationInbox";
import { useRouter } from "next/navigation";

const PAGE_SIZE = 10;

export default function HomeFeedPage() {
  const router = useRouter();

  // Notifications
  const { inbox } = useNotificationInbox("user-123"); // TODO: replace with real user ID
  const latest = inbox.find((n) => !n.read);

  // Feed state
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

  // Personalized feed endpoint
  async function fetchPersonalized(userId: string) {
    const res = await fetch(
      `/api/feed/personalized?user=${userId}&session=home`,
      { cache: "no-store" }
    );
    return await res.json();
  }

  // A) loadInitial() — personalized
  async function loadInitial() {
    setLoadingInitial(true);

    const ranked = await fetchPersonalized("user-123"); // TODO: real user ID
    const posts = await LaffLabApi.getPosts();
    const map = new Map(posts.map((p) => [p.id, p]));

    const hydrated = ranked
      .map((r: any) => map.get(r.id))
      .filter(Boolean)
      .slice(0, PAGE_SIZE);

    setItems(hydrated);
    setPage(2);
    setActiveIndex(0);

    setLoadingInitial(false);
  }

  // B) loadMore() — personalized
  async function loadMore() {
    if (loadingMore) return;
    setLoadingMore(true);

    const ranked = await fetchPersonalized("user-123");
    const posts = await LaffLabApi.getPosts();
    const map = new Map(posts.map((p) => [p.id, p]));

    const hydrated = ranked.map((r: any) => map.get(r.id)).filter(Boolean);

    const nextChunk = hydrated.slice(
      (page - 1) * PAGE_SIZE,
      page * PAGE_SIZE
    );

    if (nextChunk.length > 0) {
      setItems((prev) => [...prev, ...nextChunk]);
      setPage((p) => p + 1);
    }

    setLoadingMore(false);
  }

  // C) refresh() — uses loadInitial
  async function refresh() {
    setRefreshing(true);
    await loadInitial();
    setRefreshing(false);

    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  // Initial load
  useEffect(() => {
    loadInitial();
  }, []);

  // Auto-advance logic
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

  // Scroll to index
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

  // Scroll listener
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

  // Pull-to-refresh touch handlers (FIXED)
  function handleTouchStart(e: React.TouchEvent<HTMLDivElement>) {
    if (!scrollRef.current) return;
    if (scrollRef.current.scrollTop !== 0) return;

    const touch = e.touches?.[0];
    if (!touch) return;

    touchStartY.current = touch.clientY;
    pulling.current = true;
  }

  function handleTouchMove(e: React.TouchEvent<HTMLDivElement>) {
    if (!pulling.current || touchStartY.current == null) return;

    const touch = e.touches?.[0];
    if (!touch) return;

    const delta = touch.clientY - touchStartY.current;

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
      {/* Menu Button */}
      <div className="fixed top-[var(--space-3)] right-[var(--space-3)] z-50">
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="p-[var(--space-2)] rounded-full bg-white/10 border border-white/20 backdrop-blur hover:bg-white/20 transition-soft"
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

      {/* Slide-in Menu */}
      {menuOpen && (
        <div className="fixed top-0 right-0 w-56 bg-black/90 border-l border-white/10 backdrop-blur z-40 p-[var(--space-3)] space-y-[var(--space-2)] animate-slideDown">
          {menuItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="block px-[var(--space-2)] py-[var(--space-1)] rounded bg-white/5 hover:bg-white/10 border border-white/10 text-white/90 transition-soft"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}

      {/* Pull-to-refresh header */}
      <div className="h-10 flex items-center justify-center text-[var(--text-xs)] text-white/70 border-b border-white/10 bg-black/80 backdrop-blur">
        {refreshing ? "Refreshing…" : "Pull down to refresh · LaffLab"}
      </div>

      {/* Feed Scroll Container */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-scroll snap-y snap-mandatory"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {loadingInitial ? (
          <div className="space-y-[var(--space-3)] p-[var(--space-3)]">
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
                className="h-screen snap-start flex items-center justify-center px-[var(--space-2)]"
              >
                <div className="w-full max-w-md">
                  <JokeCard post={post} />
                </div>
              </div>
            ))}
          </div>
        )}

        {loadingMore && (
          <div className="h-20 flex items-center justify-center text-[var(--text-sm)] text-white/60">
            Loading more…
          </div>
        )}
      </div>

      {/* Notification Toast */}
      {latest && (
        <NotificationToast
          title={latest.title}
          body={latest.body}
          tone={latest.tone}
          onClick={() => {
            if (latest.url) router.push(latest.url);
          }}
        />
      )}
    </div>
  );
}
