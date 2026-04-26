"use client";

import { useState, useEffect } from "react";
import { LaffLabApi } from "@/lib/api/LaffLabApi";

export function useFavoritesStore() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadFavorites() {
    try {
      setLoading(true);
      const data = await LaffLabApi.getFavorites();
      setFavorites(data);
    } finally {
      setLoading(false);
    }
  }

  async function addFavorite(id: string) {
    await LaffLabApi.addFavorite(id);
    await loadFavorites();
  }

  async function removeFavorite(id: string) {
    await LaffLabApi.removeFavorite(id);
    await loadFavorites();
  }

  useEffect(() => {
    loadFavorites();
  }, []);

  return {
    favorites,
    loading,
    addFavorite,
    removeFavorite,
    reload: loadFavorites,
  };
}
