"use client";

import { useEffect, useState } from "react";
import { LaffLabApi } from "@/lib/api";
import type { Category } from "@/types/category";

export function useRandomCategory() {
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const categories = await LaffLabApi.getCategories();

        if (categories.length > 0) {
          const random = categories[Math.floor(Math.random() * categories.length)];
          setCategory(random);
        } else {
          setCategory(null);
        }
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
