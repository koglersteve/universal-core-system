import { create } from "zustand";

interface MemeMyCatState {
  selectedTemplate: string | null;
  setSelectedTemplate: (id: string | null) => void;
}

export const useMemeMyCatStore = create<MemeMyCatState>((set) => ({
  selectedTemplate: null,
  setSelectedTemplate: (id) => set({ selectedTemplate: id })
}));
