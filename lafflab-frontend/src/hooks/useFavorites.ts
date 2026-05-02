"use client";

import { useFavoritesStore } from "@/store/useFavoritesStore";
import type { Post } from "@/types/jokes";

export function useFavorites() {
  const favorites = useFavoritesStore((s) => s.favorites);
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);
  const isFavorite = useFavoritesStore((s) => s.isFavorite);

  return {
    favorites,
    toggleFavorite,
    isFavorite,
  };
}
