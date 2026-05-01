"use client";

import { create } from "zustand";

export const useFavoritesStore = create((set) => ({
  favorites: [] as string[],
  loading: false,

  loadFavorites: () => {
    set({ loading: true });

    try {
      const stored = localStorage.getItem("favorites");
      const parsed = stored ? JSON.parse(stored) : [];
      set({ favorites: parsed });
    } finally {
      set({ loading: false });
    }
  },

  toggleFavorite: (id: string) => {
    set((state: any) => {
      const exists = state.favorites.includes(id);
      const updated = exists
        ? state.favorites.filter((x: string) => x !== id)
        : [...state.favorites, id];

      localStorage.setItem("favorites", JSON.stringify(updated));

      return { favorites: updated };
    });
  }
}));

