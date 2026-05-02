"use client";

import { useFavoritesStore } from "@/store/useFavoritesStore";
import type { Joke } from "@/types/jokes";

export function useFavorites() {
  const favorites = useFavoritesStore((state) => state.favorites);
  const addFavorite = useFavoritesStore((state) => state.addFavorite);
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite);

  function isFavorite(id: string) {
    return favorites.some((j) => j.id === id);
  }

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
  };
}
