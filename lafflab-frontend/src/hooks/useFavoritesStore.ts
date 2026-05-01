"use client";

import { create } from "zustand";

type FavoritesStore = {
  favorites: string[];
  loading: boolean;
  loadFavorites: () => void;
  toggleFavorite: (id: string) => void;
};

export const useFavoritesStore = create<FavoritesStore>((set) => ({
  favorites: [],
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
    set((state) => {
      const exists = state.favorites.includes(id);
      const updated = exists
        ? state.favorites.filter((x) => x !== id)
        : [...state.favorites, id];

      localStorage.setItem("favorites", JSON.stringify(updated));

      return { favorites: updated };
    });
  }
}));

