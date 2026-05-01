"use client";

import { create } from "zustand";
import type { Joke } from "@/lib/api";

interface FavoritesState {
  favorites: Joke[];
  addFavorite: (joke: Joke) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: [],
  addFavorite: (joke) =>
    set((state) =>
      state.favorites.some((f) => f.id === joke.id)
        ? state
        : { favorites: [...state.favorites, joke] }
    ),
  removeFavorite: (id) =>
    set((state) => ({
      favorites: state.favorites.filter((f) => f.id !== id),
    })),
  isFavorite: (id) => get().favorites.some((f) => f.id === id),
}));

