import { create } from "zustand";

interface MoodCheckState {
  mood: string | null;
  setMood: (m: string | null) => void;
}

export const useMoodCheckStore = create<MoodCheckState>((set) => ({
  mood: null,
  setMood: (m) => set({ mood: m })
}));
