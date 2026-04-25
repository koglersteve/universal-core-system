"use client";

import { useEffect, useState } from "react";
import { HistoryItem } from "@/lib/models";
import { LAFFLAB_HISTORY_KEY } from "@/lib/constants";
import { computeStreak } from "@/lib/time";

export function useHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(LAFFLAB_HISTORY_KEY);
    if (stored) setHistory(JSON.parse(stored));
    setLoading(false);
  }, []);

  function save(list: HistoryItem[]) {
    const sorted = [...list].sort((a, b) => b.viewedAt - a.viewedAt);
    setHistory(sorted);
    localStorage.setItem(LAFFLAB_HISTORY_KEY, JSON.stringify(sorted));
  }

  function addToHistory(id: string) {
    const exists = history.find((h) => h.id === id);
    if (exists) return;

    const updated = [...history, { id, viewedAt: Date.now() }];
    save(updated);
  }

  function loadHistory() {
    const stored = localStorage.getItem(LAFFLAB_HISTORY_KEY);
    if (stored) setHistory(JSON.parse(stored));
  }

  return {
    history,
    addToHistory,
    loadHistory,
    loading,
    streak: computeStreak(history),
  };
}
