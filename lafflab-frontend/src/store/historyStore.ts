import { create } from "zustand";

interface HistoryState {
  history: string[]; // joke IDs
  addToHistory: (id: string) => void;
  clearHistory: () => void;
}

export const useHistoryStore = create<HistoryState>((set) => ({
  history: [],
  addToHistory: (id) =>
    set((state) => ({
      history: state.history.includes(id)
        ? state.history
        : [...state.history, id],
    })),
  clearHistory: () => set({ history: [] }),
}));
