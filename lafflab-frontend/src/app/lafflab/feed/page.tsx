"use client";

import { useEffect } from "react";
import { useFeed } from "@/hooks/useFeed";
import { PostCard } from "@/components/lafflab/PostCard";

export default function LafflabFeedPage() {
  const { items, loadMore, loading, hasMore } = useFeed("lafflab");

  useEffect(() => {
    function onScroll() {
      if (!hasMore || loading) return;
      const scrollPos = window.innerHeight + window.scrollY;
      const threshold = document.body.offsetHeight - 600;
      if (scrollPos >= threshold) {
        loadMore();
      }
    }

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [hasMore, loading, loadMore]);

  return (
    <main>
      {items.map(post => (
        <PostCard key={post.id} post={post} />
      ))}

      {loading && (
        <p
          style={{
            textAlign: "center",
            padding: 16,
            color: "#2b1347",
            fontWeight: 500,
          }}
        >
          Loading more laughs…
        </p>
      )}

      {!hasMore && items.length > 0 && (
        <p
          style={{
            textAlign: "center",
            padding: 16,
            color: "#2b1347",
            fontWeight: 500,
          }}
        >
          You’ve reached the end of the lab (for now).
        </p>
      )}

      {!loading && items.length === 0 && (
        <p
          style={{
            textAlign: "center",
            padding: 32,
            color: "#2b1347",
            fontWeight: 500,
          }}
        >
          No experiments yet. Seed LAFFLab in the backend to start the fun.
        </p>
      )}
    </main>
  );
}
