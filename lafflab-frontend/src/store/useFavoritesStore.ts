"use client";

import { create } from "zustand";
import type { Post } from "@/types/jokes";

interface FavoritesState {
  favorites: Post[];
  addFavorite: (post: Post) => void;
  removeFavorite: (id: string) => void;
}

export const useFavoritesStore = create<FavoritesState>((set) => ({
  favorites: [],

  addFavorite: (post) =>
    set((state) => ({
      favorites: [...state.favorites, post],
    })),

  removeFavorite: (id) =>
    set((state) => ({
      favorites: state.favorites.filter((p) => p.id !== id),
    })),
}));
