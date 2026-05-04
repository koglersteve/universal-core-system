"use client";

import { useEffect, useMemo, useState } from "react";
import AppShell from "@/components/AppShell";
import type { ReactionCounts, ReactionEmojiKey } from "@/types/os";

type ReactionSummary = {
  postId: string;
  total: number;
  counts: ReactionCounts;
  firstAt: string;
  lastAt: string;
};

function getVelocity(summary: ReactionSummary): number {
  const start = new Date(summary.firstAt).getTime();
  const end = new Date(summary.lastAt).getTime();
  if (end <= start) return summary.total;
  const hours = (end - start) / (1000 * 60 * 60);
  return summary.total / hours;
}

const EMOJI_ORDER: ReactionEmojiKey[] = [
  "laugh",
  "smile",
  "shock",
  "expressionless",
  "angry",
  "mindblown",
  "crickets",
];

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

  const globalHeat = useMemo(() => {
    const heat: ReactionCounts = {
      laugh: 0,
      smile: 0,
      shock: 0,
      expressionless: 0,
      angry: 0,
      mindblown: 0,
      crickets: 0,
    };
    for (const item of data) {
      for (const [emoji, count] of Object.entries(item.counts)) {
        heat[emoji as ReactionEmojiKey] =
          (heat[emoji as ReactionEmojiKey] || 0) + (count as number);
      }
    }
    return heat;
  }, [data]);

  return (
    <AppShell title="Reaction Analytics">
      <div className="space-y-[var(--space-4)]">
        <p className="text-white/70 text-[var(--text-sm)]">
          Emotional analytics across your posts: heatmaps, velocity, and emoji
          mix.
        </p>

        {loading && (
          <p className="text-white/60 text-[var(--text-sm)]">
            Loading analytics…
          </p>
        )}

        {!loading && data.length === 0 && (
          <p className="text-white/60 text-[var(--text-sm)]">
            No reactions yet. Once people start reacting, insights will appear
            here.
          </p>
        )}

        {/* Global emoji heatmap */}
        {!loading && data.length > 0 && (
          <div className="p-[var(--space-3)] bg-white/5 border border-white/10 rounded-lg space-y-[var(--space-2)]">
            <h2 className="text-white text-[var(--text-md)]">
              Global Emoji Heatmap
            </h2>
            <div className="flex flex-wrap gap-2">
              {EMOJI_ORDER.map((emoji) => {
                const value = globalHeat[emoji] || 0;
                const intensity = Math.min(1, value / 20);
                const bg = `rgba(255,255,255,${0.1 + intensity * 0.3})`;
                return (
                  <div
                    key={emoji}
                    className="px-3 py-2 rounded-lg text-[var(--text-xs)]"
                    style={{ backgroundColor: bg }}
                  >
                    <span className="text-white/80">{emoji}</span>
                    <span className="ml-2 text-white/60">{value}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Per-post analytics */}
        <div className="space-y-[var(--space-3)]">
          {data.map((item) => {
            const velocity = getVelocity(item);
            return (
              <div
                key={item.postId}
                className="p-[var(--space-3)] bg-white/5 border border-white/10 rounded-lg space-y-[var(--space-2)]"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-white text-[var(--text-sm)]">
                      Post ID:{" "}
                      <span className="text-white/70">{item.postId}</span>
                    </p>
                    <p className="text-white/70 text-[var(--text-xs)]">
                      Total reactions: {item.total}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-white/80 text-[var(--text-sm)]">
                      Emotional velocity
                    </p>
                    <p className="text-[var(--text-xs)] text-white/60">
                      {velocity.toFixed(2)} reactions/hour
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 text-[var(--text-xs)] text-white/70">
                  {EMOJI_ORDER.map((emoji) => (
                    <span
                      key={emoji}
                      className="px-2 py-1 bg-white/10 rounded-full"
                    >
                      {emoji}: {item.counts[emoji] || 0}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
