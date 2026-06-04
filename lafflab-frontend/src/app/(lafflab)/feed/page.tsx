"use client";

import { useEffect } from "react";
import { useFeedStore } from "@/store/useFeedStore";
import FeedList from "@/components/ui/lafflab/FeedList";

export default function FeedPage() {
  const { posts, load, loading } = useFeedStore();

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div style={{ padding: 16 }}>
      <FeedList />
      {loading && <p style={{ opacity: 0.6 }}>Loading…</p>}
    </div>
  );
}
