"use client";

import { useFavoritesStore } from "@/store/useFavoritesStore";
import type { Post } from "@/types/jokes";

export function useFavorites() {
  const favorites = useFavoritesStore((state) => state.favorites as Post[]);
  const addFavorite = useFavoritesStore((state) => state.addFavorite);
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite);

  function isFavorite(id: string) {
    return favorites.some((p) => p.id === id);
  }

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
  };
}
