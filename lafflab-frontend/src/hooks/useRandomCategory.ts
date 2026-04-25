"use client";

import { useCategories } from "./useCategories";

export function useRandomCategory() {
  const { categories, loading } = useCategories();

  function getRandomCategory() {
    if (categories.length === 0) return null;
    const index = Math.floor(Math.random() * categories.length);
    return categories[index];
  }

  return {
    loading,
    getRandomCategory,
  };
}
