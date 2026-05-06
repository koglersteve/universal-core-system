// src/app/creator/analytics/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import AppShell from "@/components/AppShell";

type ReactionSummary = {
  postId: string;
  total: number;
};

export default function CreatorAnalyticsPage() {
  const [summaries, setSummaries] = useState<ReactionSummary[]>([]);

  useEffect(() => {
    setSummaries([]);
  }, []);

  const totalReactions = useMemo(() => {
    return summaries.reduce((acc, s) => acc + s.total, 0);
  }, [summaries]);

  return (
    <AppShell>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Creator Analytics</h1>
        <p>Total Reactions: {totalReactions}</p>
      </div>
    </AppShell>
  );
}
