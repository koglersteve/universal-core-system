"use client";

import { useMoodHistoryContext } from "@/context/MoodHistoryContext";

export function useMoodHistory() {
  const ctx = useMoodHistoryContext();
  const { history } = ctx;

  const last = history[history.length - 1] ?? null;

  const mostFrequentMood = (() => {
    if (history.length === 0) return null;
    const counts: Record<string, number> = {};
    history.forEach(h => {
      counts[h.mood] = (counts[h.mood] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
  })();

  return {
    ...ctx,

    // Derived helpers
    last,
    lastMood: last?.mood ?? null,
    count: history.length,
    hasHistory: history.length > 0,
    mostFrequentMood,

    recent: (n: number) => history.slice(-n).reverse()
  };
}
