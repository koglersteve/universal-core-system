"use client";

import { useEffect, useState } from "react";
import { LaffLabApi } from "@/lib/api";
import type { Category } from "@/types/categories";

export function useRandomCategory() {
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await LaffLabApi.getRandomCategory();
        setCategory(data);
      } catch (err) {
        setError("Failed to load random category");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return { category, loading, error };
}
