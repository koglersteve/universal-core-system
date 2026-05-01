"use client";

import { useState, useEffect } from "react";
import {
  fetchHistory,
  addToHistory,
  clearHistory
} from "@/store/useHistoryStore";
import type { Joke } from "@/types/jokes";

export function useHistory() {
  const [history, setHistory] = useState<Joke[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchHistory();
        setHistory(data);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function add(jokeId: string) {
    await addToHistory(jokeId);
    const updated = await fetchHistory();
    setHistory(updated);
  }

  async function clear() {
    await clearHistory();
    setHistory([]);
  }

  return { history, loading, add, clear };
}
