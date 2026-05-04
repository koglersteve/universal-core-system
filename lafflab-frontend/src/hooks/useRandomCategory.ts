import { useEffect, useState } from "react";
import { LaffLabApi } from "@/lib/api";
import type { Category } from "@/types/categories";

export function useRandomCategory() {
  const [category, setCategory] = useState<Category | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const categories = await LaffLabApi.getCategories();

        if (categories && categories.length > 0) {
          const random =
            categories[Math.floor(Math.random() * categories.length)];

          // strict-safe: random is guaranteed to be Category
          setCategory(random ?? null);
        } else {
          setCategory(null);
        }
      } catch (err: any) {
        setError(err.message || "Failed to load categories");
        setCategory(null);
      }
    }

    load();
  }, []);

  return { category, error };
}
