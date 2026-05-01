"use client";

import { useEffect, useState } from "react";
import { LaffLabApi, type HistoryItem } from "@/lib/api";

export function useHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadHistory() {
    try {
      setLoading(true);
      setError(null);
      const data = await LaffLabApi.getHistory();
      setHistory(data);
    } catch (err: any) {
      setError(err.message || "Failed to load history");
    } finally {
      setLoading(false);
    }
  }

  async function clearHistory() {
    try {
      await LaffLabApi.clearHistory();
      setHistory([]);
    } catch (err) {
      console.error("Failed to clear history", err);
    }
  }

  useEffect(() => {
    loadHistory();
  }, []);

  return { history, loading, error, reload: loadHistory, clearHistory };
}

