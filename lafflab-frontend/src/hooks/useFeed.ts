"use client";

import { useEffect, useState } from "react";

export function useFeed(type: string = "main") {
  const [items, setItems] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  async function loadMore() {
    if (loading || !hasMore) return;

    setLoading(true);

    const res = await fetch(`/api/feed?type=${type}&page=${page}`);
    const data = await res.json();

    if (!data.items || data.items.length === 0) {
      setHasMore(false);
    } else {
      setItems((prev) => [...prev, ...data.items]);
      setPage((p) => p + 1);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadMore();
  }, []);

  return { items, loadMore, hasMore, loading };
}
