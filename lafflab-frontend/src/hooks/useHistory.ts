"use client";

import { useState, useEffect } from "react";
import {
  fetchHistory,
  addToHistory,
  clearHistory as clearHistoryApi
} from "@/store/useHistoryStore";

export function useHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await fetchHistory();
      setHistory(data);
      setLoading(false);
    }
    load();
  }, []);

  async function add(jokeId: string) {
    await addToHistory(jokeId);
    setHistory(await fetchHistory());
  }

  async function clear() {
    await clearHistoryApi();
    setHistory([]);
  }

  return { history, loading, add, clear };
}

