"use client";

import { useEffect, useState } from "react";
import { LaffLabApi } from "@/lib/api";
import type { Joke } from "@/types/jokes";

export function useJokesByCategory(categoryId: string | null) {
  const [jokes, setJokes] = useState<Joke[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!categoryId) return;

    async function load() {
      try {
        const data = await LaffLabApi.getJokesByCategory(categoryId);
        setJokes(data);
      } catch (err) {
        setError("Failed to load jokes");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [categoryId]);

  return { jokes, loading, error };
}
