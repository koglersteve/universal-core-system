"use client";

import { create } from "zustand";

type MoodState = {
  mood: string | null;
  setMood: (m: string | null) => void;
};

export const useMoodStore = create<MoodState>((set) => ({
  mood: null,
  setMood: (m) => set({ mood: m }),
}));
