"use client";

import { useState, useEffect } from "react";
import { fetchJokes, fetchJoke } from "@/store/useJokesStore";
import type { Joke } from "@/types/jokes";

export function useJokes() {
  const [jokes, setJokes] = useState<Joke[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchJokes();
        setJokes(data);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function get(id: string) {
    return fetchJoke(id);
  }

  return { jokes, loading, get };
}
