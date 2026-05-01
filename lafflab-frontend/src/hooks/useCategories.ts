"use client";

import { useEffect, useState } from "react";
import { LaffLabApi } from "@/lib/api";
import type { Category } from "@/types/category";

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await LaffLabApi.getCategories();
      setCategories(data);
      setLoading(false);
    }
    load();
  }, []);

  return { categories, loading };
}
