"use client";

import { useEffect, useState } from "react";
import { LaffLabApi, type Category } from "@/lib/api";

export function useCategoryDetails(id: string | null) {
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadCategory() {
    if (!id) return;
    try {
      setLoading(true);
      setError(null);
      const data = await LaffLabApi.getCategory(id);
      setCategory(data);
    } catch (err: any) {
      setError(err.message || "Failed to load category");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCategory();
  }, [id]);

  return { category, loading, error, reload: loadCategory };
}
