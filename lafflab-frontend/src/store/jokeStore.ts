import { create } from "zustand";
import type { Joke, Category } from "@/lib/api/types";

interface JokeState {
  jokes: Record<string, Joke>;
  categories: Category[];
  setJokes: (list: Joke[]) => void;
  setCategories: (list: Category[]) => void;
}

export const useJokeStore = create<JokeState>((set) => ({
  jokes: {},
  categories: [],
  setJokes: (list) =>
    set(() => ({
      jokes: list.reduce<Record<string, Joke>>((acc, joke) => {
        acc[joke.id] = joke;
        return acc;
      }, {}),
    })),
  setCategories: (list) => set({ categories: list }),
}));
