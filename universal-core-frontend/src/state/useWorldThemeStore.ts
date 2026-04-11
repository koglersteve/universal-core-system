"use client";

import { create } from "zustand";

export type WorldTheme =
  | "world-theme-soft"
  | "world-theme-chaotic"
  | "world-theme-calm"
  | "world-theme-dark"
  | "world-theme-bright";

type WorldThemeState = {
  world: WorldTheme | null;
  setWorld: (theme: WorldTheme | null) => void;
  cycleWorld: () => void;
};

const ALL_WORLD_THEMES: WorldTheme[] = [
  "world-theme-soft",
  "world-theme-chaotic",
  "world-theme-calm",
  "world-theme-dark",
  "world-theme-bright",
];

export const useWorldThemeStore = create<WorldThemeState>((set, get) => ({
  world: "world-theme-calm",

  setWorld: (theme) => set({ world: theme }),

  cycleWorld: () => {
    const current = get().world;
    const index = ALL_WORLD_THEMES.indexOf(current || "world-theme-calm");
    const next = ALL_WORLD_THEMES[(index + 1) % ALL_WORLD_THEMES.length];
    set({ world: next });
  },
}));
