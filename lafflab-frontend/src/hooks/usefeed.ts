"use client";

import { useState, useEffect, useCallback } from "react";
import { fetchFeed } from "@/lib/api";

export function useFeed(app: string) {
  const [items, setItems] = useState<any[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const data = await fetchFeed({ app, cursor, limit: 10 });
      setItems(prev => [...prev, ...data.items]);
      setCursor(data.nextCursor);
      setHasMore(Boolean(data.nextCursor));
    } finally {
      setLoading(false);
    }
  }, [app, cursor, loading, hasMore]);

  useEffect(() => {
    // reset when app changes
    setItems([]);
    setCursor(null);
    setHasMore(true);
  }, [app]);

  useEffect(() => {
    loadMore();
  }, [loadMore]);

  return { items, loadMore, loading, hasMore };
}
