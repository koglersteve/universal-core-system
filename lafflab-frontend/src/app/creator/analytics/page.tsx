"use client";

// src/app/creator/analytics/page.tsx

import { useEffect, useMemo, useState } from "react";
import AppShell from "@/components/AppShell";
import type { ReactionCounts, ReactionEmojiKey } from "@/types/os";

type ReactionSummary = {
  postId: string;
  reactions: ReactionCounts;
};

const EMOJI_ORDER: ReactionEmojiKey[] = [
  "laugh",
  "smile",
  "expressionless",
  "shock",
  "mindblown",
  "angry",
  "crickets",
];

export default function CreatorAnalyticsPage() {
  const [data, setData] = useState<ReactionSummary[]>([]);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/creator/analytics");
      const json = await res.json();
      setData(json);
    }
    load();
  }, []);

  const totals = useMemo(() => {
    const sum: ReactionCounts = {
      laugh: 0,
      smile: 0,
      expressionless: 0,
      shock: 0,
      mindblown: 0,
      angry: 0,
      crickets: 0,
    };

    for (const item of data) {
      for (const key of EMOJI_ORDER) {
        sum[key] += item.reactions[key];
      }
    }

    return sum;
  }, [data]);

  return (
    <AppShell title="Creator Analytics">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Creator Analytics</h1>

        <div className="grid grid-cols-7 gap-4">
          {EMOJI_ORDER.map((key) => (
            <div key={key} className="p-4 bg-white rounded shadow">
              <div className="text-lg font-semibold capitalize">{key}</div>
              <div className="text-3xl font-bold">{totals[key]}</div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
