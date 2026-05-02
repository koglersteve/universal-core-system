// src/store/useFavoritesStore.ts

"use client";

import { create } from "zustand";
import { LaffLabApi } from "@/lib/LaffLabApi";

interface FavoritesState {
  favorites: Set<string>;
  loading: boolean;
  initialized: boolean;

  init: () => Promise<void>;
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => Promise<void>;
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: new Set(),
  loading: false,
  initialized: false,

  // --- Load from server + merge with local cache ---
  init: async () => {
    if (get().initialized) return;

    try {
      const server = await LaffLabApi.getFavorites();
      const local = JSON.parse(localStorage.getItem("favorites") || "[]");

      const merged = new Set([...server.favorites, ...local]);

      set({ favorites: merged, initialized: true });

      localStorage.setItem("favorites", JSON.stringify([...merged]));
    } catch (err) {
      console.error("Failed to load favorites:", err);
      set({ initialized: true });
    }
  },

  isFavorite: (id) => get().favorites.has(id),

  // --- Optimistic toggle with rollback ---
  toggleFavorite: async (id) => {
    const { favorites } = get();
    const isFav = favorites.has(id);

    const updated = new Set(favorites);
    if (isFav) updated.delete(id);
    else updated.add(id);

    // Optimistic update
    set({ favorites: updated });
    localStorage.setItem("favorites", JSON.stringify([...updated]));

    try {
      if (isFav) {
        await LaffLabApi.removeFavorite(id);
      } else {
        await LaffLabApi.addFavorite(id);
      }
    } catch (err) {
      console.error("Favorite toggle failed, rolling back:", err);

      // Rollback
      const rollback = new Set(favorites);
      set({ favorites: rollback });
      localStorage.setItem("favorites", JSON.stringify([...rollback]));
    }
  },
}));
