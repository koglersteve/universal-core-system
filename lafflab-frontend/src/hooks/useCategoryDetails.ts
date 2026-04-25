"use client";

import { useCategories } from "./useCategories";
import { useJokesByCategory } from "./useJokesByCategory";

export function useCategoryDetails(categoryId: string | null) {
  const { categories, loading: loadingCategories } = useCategories();
  const {
    jokes,
    loading: loadingJokes,
    error,
    reload,
  } = useJokesByCategory(categoryId);

  const category = categories.find((c) => c.id === categoryId) || null;

  return {
    category,
    jokes,
    loading: loadingCategories || loadingJokes,
    error,
    reload,
  };
}
