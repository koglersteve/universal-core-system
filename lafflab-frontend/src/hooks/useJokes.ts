"use client";

import { useEffect, useState } from "react";
import { LaffLabApi, type Joke } from "@/lib/api";

export function useJokes() {
  const [jokes, setJokes] = useState<Joke[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadJokes() {
    try {
      setLoading(true);
      setError(null);

      const data = await LaffLabApi.getJokes();
      setJokes(data);
    } catch (err: any) {
      setError(err.message || "Failed to load jokes");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadJokes();
  }, []);

  return {
    jokes,
    loading,
    error,
    reload: loadJokes,
  };
}

