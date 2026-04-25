"use client";

import { useEffect, useState } from "react";
import { FavoriteItem } from "@/lib/models";
import { LAFFLAB_FAVORITES_KEY } from "@/lib/constants";

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(LAFFLAB_FAVORITES_KEY);
    if (stored) setFavorites(JSON.parse(stored));
    setLoading(false);
  }, []);

  function save(list: FavoriteItem[]) {
    const sorted = [...list].sort((a, b) => b.favoritedAt - a.favoritedAt);
    setFavorites(sorted);
    localStorage.setItem(LAFFLAB_FAVORITES_KEY, JSON.stringify(sorted));
  }

  function toggleFavorite(id: string) {
    const exists = favorites.find((f) => f.id === id);

    const updated = exists
      ? favorites.filter((f) => f.id !== id)
      : [...favorites, { id, favoritedAt: Date.now() }];

    save(updated);
  }

  function loadFavorites() {
    const stored = localStorage.getItem(LAFFLAB_FAVORITES_KEY);
    if (stored) setFavorites(JSON.parse(stored));
  }

  return {
    favorites,
    toggleFavorite,
    loadFavorites,
    loading,
  };
}
