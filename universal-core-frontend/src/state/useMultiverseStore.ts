"use client";

import { create } from "zustand";

export type EmotionalWorld = {
  id: string;
  name: string;
  history: { mood: string; timestamp: number }[];
  vector: Record<string, number>;
  createdAt: number;
};

type MultiverseState = {
  worlds: EmotionalWorld[];
  activeWorldId: string;

  createWorld: (name: string) => void;
  switchWorld: (id: string) => void;
  updateWorld: (id: string, data: Partial<EmotionalWorld>) => void;

  diffWorlds: (
    a: string,
    b: string
  ) => {
    added: string[];
    removed: string[];
    intensityDelta: Record<string, number>;
  };
};

export const useMultiverseStore = create<MultiverseState>((set, get) => ({
  worlds: [
    {
      id: "prime",
      name: "Prime World",
      history: [],
      vector: {},
      createdAt: Date.now(),
    },
  ],

  activeWorldId: "prime",

  createWorld: (name) => {
    const id = crypto.randomUUID();
    const newWorld: EmotionalWorld = {
      id,
      name,
      history: [],
      vector: {},
      createdAt: Date.now(),
    };

    set((state) => ({
      worlds: [...state.worlds, newWorld],
      activeWorldId: id,
    }));
  },

  switchWorld: (id) => {
    set({ activeWorldId: id });
  },

  updateWorld: (id, data) => {
    set((state) => ({
      worlds: state.worlds.map((w) =>
        w.id === id ? { ...w, ...data } : w
      ),
    }));
  },

  diffWorlds: (a, b) => {
    const { worlds } = get();
    const worldA = worlds.find((w) => w.id === a);
    const worldB = worlds.find((w) => w.id === b);

    if (!worldA || !worldB)
      return { added: [], removed: [], intensityDelta: {} };

    const moodsA = Object.keys(worldA.vector);
    const moodsB = Object.keys(worldB.vector);

    const added = moodsB.filter((m) => !moodsA.includes(m));
    const removed = moodsA.filter((m) => !moodsB.includes(m));

    const intensityDelta: Record<string, number> = {};
    for (const m of new Set([...moodsA, ...moodsB])) {
      intensityDelta[m] =
        (worldB.vector[m] || 0) - (worldA.vector[m] || 0);
    }

    return { added, removed, intensityDelta };
  },
}));
