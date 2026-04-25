import { create } from "zustand";

interface RitualState {
  ritualMessage: string | null;
  setRitualMessage: (msg: string) => void;
}

export const useRitualStore = create<RitualState>((set) => ({
  ritualMessage: null,
  setRitualMessage: (msg) => set({ ritualMessage: msg }),
}));
