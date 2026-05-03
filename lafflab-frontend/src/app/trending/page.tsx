"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/AppShell";
import JokeCard from "@/components/JokeCard";
import type { Post } from "@/types/jokes";

type TrendingPost = Post & { trendScore: number };

export default function TrendingPage() {
  const [items, setItems] = useState<TrendingPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const res = await fetch("/api/feed/trending");
      const json = await res.json();
      setItems(json.posts || []);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <AppShell title="Trending">
      <div className="space-y-[var(--space-4)]">
        <p className="text-white/70 text-[var(--text-sm)]">
          Posts ranked by emotional heat, velocity, and recency.
        </p>

        {loading && (
          <p className="text-white/60 text-[var(--text-sm)]">
            Loading trending posts…
          </p>
        )}

        <div className="space-y-[var(--space-4)]">
          {items.map((post) => (
            <div key={post.id} className="space-y-1">
              <JokeCard post={post} />
              <p className="text-[var(--text-xs)] text-white/60">
                Trend score: {post.trendScore.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
