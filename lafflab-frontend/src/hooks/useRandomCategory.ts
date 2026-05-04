import { useEffect, useState } from "react";
import { LaffLabApi } from "@/lib/api";
import type { Category } from "@/types/category";

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
