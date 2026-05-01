"use client";

import { useEffect, useState } from "react";
import { LaffLabApi, type Joke } from "@/lib/api";

export function useJokesByCategory(categoryId: string | null) {
  const [jokes, setJokes] = useState<Joke[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadJokes() {
    if (!categoryId) return;
    try {
      setLoading(true);
      setError(null);
      const data = await LaffLabApi.getJokesByCategory(categoryId);
      setJokes(data);
    } catch (err: any) {
      setError(err.message || "Failed to load jokes by category");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadJokes();
  }, [categoryId]);

  return { jokes, loading, error, reload: loadJokes };
}
