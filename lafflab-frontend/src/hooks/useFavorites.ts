"use client";

import { useState, useEffect } from "react";
import {
  getFavorites,
  addFavorite,
  removeFavorite
} from "@/store/useFavoritesStore";
import type { Joke } from "@/lib/api";

export function useFavorites() {
  const [favorites, setFavorites] = useState<Joke[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getFavorites();
        setFavorites(data);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function add(joke: Joke) {
    await addFavorite(joke.id);
    setFavorites(prev =>
      prev.some(f => f.id === joke.id) ? prev : [...prev, joke]
    );
  }

  async function remove(id: string) {
    await removeFavorite(id);
    setFavorites(prev => prev.filter(f => f.id !== id));
  }

  function isFavorite(id: string) {
    return favorites.some(f => f.id === id);
  }

  return { favorites, add, remove, isFavorite, loading };
}
