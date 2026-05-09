"use client";

import { create } from "zustand";

const LOCAL_KEY = "lafflab_favorites";

type FavoritesState = {
  favorites: Set<string>;
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  loadFavorites: () => void;
};

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: new Set(),

  isFavorite: (id: string) => {
    return get().favorites.has(id);
  },

  toggleFavorite: (id: string) => {
    const favs = new Set(get().favorites);
    if (favs.has(id)) {
      favs.delete(id);
    } else {
      favs.add(id);
    }
    set({ favorites: favs });
    saveLocal(favs);
  },

  addFavorite: (id: string) => {
    const favs = new Set(get().favorites);
    favs.add(id);
    set({ favorites: favs });
    saveLocal(favs);
  },

  removeFavorite: (id: string) => {
    const favs = new Set(get().favorites);
    favs.delete(id);
    set({ favorites: favs });
    saveLocal(favs);
  },

  loadFavorites: () => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(LOCAL_KEY);
      if (!raw) return;
      const arr: string[] = JSON.parse(raw);
      set({ favorites: new Set(arr) });
    } catch {
      set({ favorites: new Set() });
    }
  }
}));

function saveLocal(favs: Set<string>) {
  if (typeof window === "undefined") return;
  try {
    const arr = Array.from(favs);
    localStorage.setItem(LOCAL_KEY, JSON.stringify(arr));
  } catch (err) {
    console.error("Failed to save favorites locally:", err);
  }
}
