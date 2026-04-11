"use client";

import { useMemo } from "react";
import { useMoodHistoryStore } from "@/state/useMoodHistoryStore";

export function useMoodHistory() {
  const history = useMoodHistoryStore((s) => s.history);
  const addMood = useMoodHistoryStore((s) => s.addMood);

  const last = history.length > 0 ? history[history.length - 1] : null;

  const mostFrequentMood = useMemo(() => {
    if (history.length === 0) return null;

    const counts: Record<string, number> = {};
    history.forEach((h) => {
      counts[h.mood] = (counts[h.mood] || 0) + 1;
    });

    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
  }, [history]);

  return {
    history,
    addMood,

    // Derived helpers
    last,
    lastMood: last?.mood ?? null,
    count: history.length,
    hasHistory: history.length > 0,
    mostFrequentMood,

    recent: (n: number) => history.slice(-n).reverse(),
  };
}
