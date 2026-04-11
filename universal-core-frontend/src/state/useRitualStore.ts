"use client";

import { create } from "zustand";

export type RitualState = {
  lastDailyRitual: number | null;
  lastWeeklyRitual: number | null;

  setLastDailyRitual: (ts: number) => void;
  setLastWeeklyRitual: (ts: number) => void;

  loadFromStorage: () => void;
};

export const useRitualStore = create<RitualState>((set) => ({
  lastDailyRitual: null,
  lastWeeklyRitual: null,

  setLastDailyRitual: (ts) => {
    localStorage.setItem("lastDailyRitual", String(ts));
    set({ lastDailyRitual: ts });
  },

  setLastWeeklyRitual: (ts) => {
    localStorage.setItem("lastWeeklyRitual", String(ts));
    set({ lastWeeklyRitual: ts });
  },

  loadFromStorage: () => {
    const daily = Number(localStorage.getItem("lastDailyRitual")) || null;
    const weekly = Number(localStorage.getItem("lastWeeklyRitual")) || null;

    set({
      lastDailyRitual: daily,
      lastWeeklyRitual: weekly,
    });
  },
}));
