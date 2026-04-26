"use client";

import { useEffect, useState } from "react";
import { LaffLabApi } from "@/lib/api/LaffLabApi";
import type { Joke, Category } from "@/lib/api/types";

export function useJokeStore() {
  const [jokes, setJokes] = useState<Joke[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadJokes() {
    try {
      setLoading(true);
      setError(null);

      const data = await LaffLabApi.jokes.list();
      setJokes(data);
    } catch (err: any) {
      setError(err.message || "Failed to load jokes");
    } finally {
      setLoading(false);
    }
  }

  async function loadCategories() {
    try {
      setLoading(true);
      setError(null);

      const data = await LaffLabApi.getCategories();
      setCategories(data);
    } catch (err: any) {
      setError(err.message || "Failed to load categories");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // Load both in parallel
    Promise.all([loadJokes(), loadCategories()]);
  }, []);

  return {
    jokes,
    categories,
    loading,
    error,
    reloadJokes: loadJokes,
    reloadCategories: loadCategories,
  };
}
