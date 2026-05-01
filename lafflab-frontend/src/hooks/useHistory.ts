"use client";

import { useEffect, useState } from "react";
import { computeStreak } from "@/lib/time";
import { LaffLabApi } from "@/lib/api/LaffLabApi";

export function useHistory() {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadHistory() {
    setLoading(true);
    const data = await LaffLabApi.history.list();
    setHistory(data);
    setLoading(false);
  }

  async function addToHistory(id: string) {
    await LaffLabApi.history.add(id);
    await loadHistory();
  }

  async function clearHistory() {
    await LaffLabApi.history.clear();
    await loadHistory();
  }

  useEffect(() => {
    loadHistory();
  }, []);

  return {
    history,
    addToHistory,
    clearHistory,
    loadHistory,
    loading,
    streak: computeStreak(history),
  };
}

