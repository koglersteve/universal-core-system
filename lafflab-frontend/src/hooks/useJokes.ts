"use client";

import { useState, useEffect } from "react";
import { LaffLabApi } from "@/lib/api";
import type { Joke } from "@/types/jokes";

export function useJokes() {
  const [jokes, setJokes] = useState<Joke[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await LaffLabApi.getJokes();
        setJokes(data);
      } catch (err) {
        setError("Failed to load jokes");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return { jokes, loading, error };
}

