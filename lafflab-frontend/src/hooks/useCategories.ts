"use client";

import { useEffect, useState } from "react";
import { LaffLabApi } from "@/lib/api/LaffLabApi";

export function useCategories() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadCategories() {
    try {
      setLoading(true);
      const data = await LaffLabApi.getCategories();
      setCategories(data);
    } catch (err: any) {
      setError(err.message || "Failed to load categories");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCategories();
  }, []);

  return {
    categories,
    loading,
    error,
    reload: loadCategories,
  };
}
