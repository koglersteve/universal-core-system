export const dynamic = "force-dynamic";

"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/AppShell";
import JokeCard from "@/components/JokeCard";
import type { Post } from "@/types/jokes";

type RankedPost = Post & { score: number };

export default function ForYouPage() {
  const [items, setItems] = useState<RankedPost[]>([]);
  const [loading, setLoading] = useState(true);

  const userId = "user-123"; // replace with real auth later

  useEffect(() => {
    async function load() {
      setLoading(true);
      const res = await fetch(`/api/feed/foryou?userId=${userId}`);
      const json = await res.json();
      setItems(json.posts || []);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <AppShell title="For You">
      <div className="space-y-[var(--space-4)]">
        <p className="text-white/70 text-[var(--text-sm)]">
          Personalized feed based on your reactions across the ecosystem.
        </p>

        {loading && (
          <p className="text-white/60 text-[var(--text-sm)]">Loading…</p>
        )}

        <div className="space-y-[var(--space-4)]">
          {items.map((post) => (
            <JokeCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </AppShell>
  );
}
