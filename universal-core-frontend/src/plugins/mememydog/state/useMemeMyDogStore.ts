import { create } from "zustand";

interface MemeMyDogState {
  selectedTemplate: string | null;
  setSelectedTemplate: (id: string | null) => void;
}

export const useMemeMyDogStore = create<MemeMyDogState>((set) => ({
  selectedTemplate: null,
  setSelectedTemplate: (id) => set({ selectedTemplate: id })
}));
