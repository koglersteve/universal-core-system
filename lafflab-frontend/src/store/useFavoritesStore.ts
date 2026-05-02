"use client";

import { create } from "zustand";
import type { Post } from "@/types/jokes";
import { LaffLabApi } from "@/lib/api";

interface FavoritesState {
  favorites: Post[];
  loading: boolean;
  hydrated: boolean;
  hydrate: () => Promise<void>;
  toggleFavorite: (post: Post) => Promise<void>;
  isFavorite: (id: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: [],
  loading: false,
  hydrated: false,

  async hydrate() {
    if (get().hydrated) return;
    set({ loading: true });
    const favorites = await LaffLabApi.getFavorites();
    set({ favorites, loading: false, hydrated: true });
  },

  async toggleFavorite(post) {
    const { favorites } = get();
    const exists = favorites.some((p) => p.id === post.id);

    // optimistic update
    if (exists) {
      set({
        favorites: favorites.filter((p) => p.id !== post.id),
      });
      await LaffLabApi.removeFavorite(post.id);
    } else {
      set({
        favorites: [...favorites, post],
      });
      await LaffLabApi.addFavorite(post.id);
    }
  },

  isFavorite(id) {
    return get().favorites.some((p) => p.id === id);
  },
}));
