import { create } from "zustand";

interface FavoritesState {
  favorites: string[]; // joke IDs
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
}

export const useFavoritesStore = create<FavoritesState>((set) => ({
  favorites: [],
  addFavorite: (id) =>
    set((state) =>
      state.favorites.includes(id)
        ? state.favorites
        : { favorites: [...state.favorites, id] }
    ),
  removeFavorite: (id) =>
    set((state) => ({
      favorites: state.favorites.filter((jokeId) => jokeId !== id),
    })),
}));
