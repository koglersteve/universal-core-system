"use client";

import { useEffect, useState } from "react";
import { LaffLabApi, type Category } from "@/lib/api";

export function useRandomCategory() {
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadRandomCategory() {
    try {
      setLoading(true);
      setError(null);
      const categories = await LaffLabApi.getCategories();
      if (categories.length === 0) {
        setCategory(null);
        return;
      }
      const idx = Math.floor(Math.random() * categories.length);
      setCategory(categories[idx]);
    } catch (err: any) {
      setError(err.message || "Failed to load random category");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadRandomCategory();
  }, []);

  return { category, loading, error, reload: loadRandomCategory };
}
