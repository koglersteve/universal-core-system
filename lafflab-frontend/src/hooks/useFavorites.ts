"use client";

import { useFavoritesStore } from "@/store/useFavoritesStore";
import type { Post } from "@/types/jokes";

export function useFavorites() {
  const favorites = useFavoritesStore((s) => s.favorites);
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);
  const isFavorite = useFavoritesStore((s) => s.isFavorite);
  const hydrate = useFavoritesStore((s) => s.hydrate);
  const loading = useFavoritesStore((s) => s.loading);

  return {
    favorites: favorites as Post[],
    toggleFavorite,
    isFavorite,
    hydrate,
    loading,
  };
}
