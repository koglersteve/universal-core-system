"use client";

import { create } from "zustand";
import type { Joke } from "@/types/jokes";

interface FavoritesState {
  favorites: Joke[];
  addFavorite: (joke: Joke) => void;
  removeFavorite: (id: string) => void;
}

export const useFavoritesStore = create<FavoritesState>((set) => ({
  favorites: [],
  addFavorite: (joke) =>
    set((state) => ({
      favorites: [...state.favorites, joke],
    })),
  removeFavorite: (id) =>
    set((state) => ({
      favorites: state.favorites.filter((j) => j.id !== id),
    })),
}));
