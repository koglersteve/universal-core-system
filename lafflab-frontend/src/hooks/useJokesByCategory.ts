"use client";

import { useEffect, useState } from "react";
import { LaffLabApi } from "@/lib/api/LaffLabApi";

export function useJokesByCategory(categoryId: string | null) {
  const [jokes, setJokes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    if (!categoryId) return;

    try {
      setLoading(true);
      const data = await LaffLabApi.getJokesByCategory(categoryId);
      setJokes(data);
    } catch (err: any) {
      setError(err.message || "Failed to load jokes");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [categoryId]);

  return {
    jokes,
    loading,
    error,
    reload: load,
  };
}
