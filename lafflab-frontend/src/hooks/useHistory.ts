"use client";

import { useState, useEffect } from "react";
import { fetchHistory, clearHistory } from "@/lib/api";
import type { HistoryItem } from "@/types/history";

export function useHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchHistory();
        setHistory(data);
      } catch (err) {
        setError("Failed to load history");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function reload() {
    const data = await fetchHistory();
    setHistory(data);
  }

  async function clear() {
    await clearHistory();
    setHistory([]);
  }

  return { history, loading, error, reload, clear };
}

