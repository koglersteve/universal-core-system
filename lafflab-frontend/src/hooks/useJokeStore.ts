"use client";

import { create } from "zustand";

type JokeStore = {
  jokes: any[];
  loading: boolean;
  error: string | null;
  loadJokes: () => Promise<void>;
};

export const useJokeStore = create<JokeStore>((set) => ({
  jokes: [],
  loading: false,
  error: null,

  loadJokes: async () => {
    try {
      set({ loading: true, error: null });

      const data = await LaffLabApi.getJokes(); // correct API call
      set({ jokes: data });
    } catch (err: any) {
      set({ error: err.message || "Failed to load jokes" });
    } finally {
      set({ loading: false });
    }
  }
}));
