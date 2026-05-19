"use client";

import { useEffect, useState } from "react";
import { LaffLabApi } from "@/lib/api";

type FeedItem = any; // you can tighten this later based on backend shape

export function useFeed(type: string = "main") {
  const [items, setItems] = useState<FeedItem[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadMore() {
    if (loading || !hasMore) return;

    setLoading(true);
    setError(null);

    try {
      const data = await LaffLabApi.fetchFeed({
        app: "lafflab",
        cursor,
        limit: 20,
      });

      // assuming backend shape: { posts: [...], nextCursor?: string | null }
      const newItems = data.posts ?? data.items ?? [];
      const nextCursor = data.nextCursor ?? null;

      if (!newItems.length) {
        setHasMore(false);
      } else {
        setItems((prev) => [...prev, ...newItems]);
        setCursor(nextCursor);
        if (!nextCursor) setHasMore(false);
      }
    } catch (err: any) {
      console.error("Failed to load feed:", err);
      setError("Failed to load feed");
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // initial load
    loadMore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  return { items, loadMore, hasMore, loading, error };
}
