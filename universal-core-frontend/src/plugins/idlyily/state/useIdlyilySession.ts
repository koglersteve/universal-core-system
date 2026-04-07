// src/plugins/idlyily/state/useIdlyilySession.ts

import { create } from "zustand";

interface SessionEntry {
  id: string;
  timestamp: string;
  text: string;
  mood?: string;
}

interface IdlyilySessionStore {
  history: SessionEntry[];
  lastMoodScore?: number;
  emotionalStreak: number;

  addEntry: (entry: SessionEntry) => void;
  setMoodScore: (score: number) => void;
}

export const useIdlyilySession = create<IdlyilySessionStore>((set, get) => ({
  history: [],
  lastMoodScore: undefined,
  emotionalStreak: 0,

  addEntry: (entry) =>
    set((state) => ({
      history: [entry, ...state.history],
      emotionalStreak: state.emotionalStreak + 1,
    })),

  setMoodScore: (score) =>
    set({
      lastMoodScore: score,
    }),
}));
