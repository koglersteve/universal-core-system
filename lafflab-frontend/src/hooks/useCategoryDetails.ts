import { useEffect, useState } from "react";
import { LaffLabApi } from "@/lib/api";
import type { Category } from "@/types/category";

export function useCategoryDetails(id: string | null) {
  const [category, setCategory] = useState<Category | null>(null);

  useEffect(() => {
    if (!id) return;

    LaffLabApi.getCategory(id)
      .then((data) => setCategory(data))
      .catch(() => setCategory(null));
  }, [id]);

  return category;
}
