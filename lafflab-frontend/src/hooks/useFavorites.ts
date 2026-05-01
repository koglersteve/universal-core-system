"use client";

import { useFavoritesStore } from "@/store/useFavoritesStore";
import type { Joke } from "@/lib/api";

export function useFavorites() {
  const favorites = useFavoritesStore((s) => s.favorites);
  const addFavorite = useFavoritesStore((s) => s.addFavorite);
  const removeFavorite = useFavoritesStore((s) => s.removeFavorite);
  const isFavorite = useFavoritesStore((s) => s.isFavorite);

  function toggleFavorite(joke: Joke) {
    if (isFavorite(joke.id)) {
      removeFavorite(joke.id);
    } else {
      addFavorite(joke);
    }
  }

  return { favorites, addFavorite, removeFavorite, isFavorite, toggleFavorite };
}
