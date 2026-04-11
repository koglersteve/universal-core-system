"use client";

import { create } from "zustand";

export type MoodEntry = {
  mood: string;
  timestamp: number;
};

type MoodHistoryState = {
  history: MoodEntry[];
  addMood: (mood: string) => void;
  clearHistory: () => void;
};

export const useMoodHistoryStore = create<MoodHistoryState>((set) => ({
  history: [],
  addMood: (mood) =>
    set((state) => ({
      history: [...state.history, { mood, timestamp: Date.now() }],
    })),
  clearHistory: () => set({ history: [] }),
}));
