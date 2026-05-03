"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/AppShell";

type ReactionSummary = {
  postId: string;
  total: number;
  counts: Record<string, number>;
};

export default function CreatorAnalyticsPage() {
  const [data, setData] = useState<ReactionSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const res = await fetch("/api/reactions/summary");
      const json = await res.json();
      setData(json.posts || []);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <AppShell title="Reaction Analytics">
      <div className="space-y-[var(--space-4)]">
        <p className="text-white/70 text-[var(--text-sm)]">
          See how people are reacting to your posts across the ecosystem.
        </p>

        {loading && <p className="text-white/60 text-sm">Loading analytics…</p>}

        {!loading && data.length === 0 && (
          <p className="text-white/60 text-sm">
            No reactions yet. Once people start reacting, you’ll see insights here.
          </p>
        )}

        <div className="space-y-[var(--space-3)]">
          {data.map((item) => (
            <div
              key={item.postId}
              className="p-[var(--space-3)] bg-white/5 border border-white/10 rounded-lg"
            >
              <p className="text-white text-[var(--text-sm)] mb-2">
                Post ID: <span className="text-white/70">{item.postId}</span>
              </p>
              <p className="text-white/80 text-[var(--text-sm)] mb-1">
                Total reactions: {item.total}
              </p>
              <div className="flex flex-wrap gap-2 text-[var(--text-xs)] text-white/70">
                {Object.entries(item.counts).map(([emoji, count]) => (
                  <span
                    key={emoji}
                    className="px-2 py-1 bg-white/10 rounded-full"
                  >
                    {emoji}: {count}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
