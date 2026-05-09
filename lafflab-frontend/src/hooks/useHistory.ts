"use client";

import { useState, useEffect } from "react";
import { LaffLabApi } from "@/lib/api";
import type { HistoryItem } from "@/types/history";

export function useHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await LaffLabApi.getHistory();
        setHistory(data);
      } catch {
        setError("Failed to load history");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function reload() {
    const data = await LaffLabApi.getHistory();
    setHistory(data);
  }

  async function clear() {
    await LaffLabApi.clearHistory();
    setHistory([]);
  }

  return { history, loading, error, reload, clear };
}
