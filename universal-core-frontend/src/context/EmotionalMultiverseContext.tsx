"use client";

import { createContext, useContext, useState, ReactNode, useCallback, useMemo } from "react";
import type { MoodEntry } from "@/context/MoodHistoryContext";

export type EmotionalWorld = {
  id: string;
  name: string;
  history: MoodEntry[];
  vector: Record<string, number>;
  createdAt: number;
};

type EmotionalMultiverseContextType = {
  worlds: EmotionalWorld[];
  activeWorldId: string;
  createWorld: (name: string) => void;
  switchWorld: (id: string) => void;
  updateWorld: (id: string, data: Partial<EmotionalWorld>) => void;
  diffWorlds: (a: string, b: string) => { added: string[]; removed: string[]; intensityDelta: Record<string, number> };
};

const EmotionalMultiverseContext = createContext<EmotionalMultiverseContextType | undefined>(undefined);

export function EmotionalMultiverseProvider({ children }: { children: ReactNode }) {
  const [worlds, setWorlds] = useState<EmotionalWorld[]>([
    {
      id: "prime",
      name: "Prime World",
      history: [],
      vector: {},
      createdAt: Date.now()
    }
  ]);

  const [activeWorldId, setActiveWorldId] = useState("prime");

  const createWorld = useCallback((name: string) => {
    const id = crypto.randomUUID();
    setWorlds(prev => [
      ...prev,
      {
        id,
        name,
        history: [],
        vector: {},
        createdAt: Date.now()
      }
    ]);
    setActiveWorldId(id);
  }, []);

  const switchWorld = useCallback((id: string) => {
    setActiveWorldId(id);
  }, []);

  const updateWorld = useCallback((id: string, data: Partial<EmotionalWorld>) => {
    setWorlds(prev =>
      prev.map(w => (w.id === id ? { ...w, ...data } : w))
    );
  }, []);

  const diffWorlds = useCallback((a: string, b: string) => {
    const worldA = worlds.find(w => w.id === a);
    const worldB = worlds.find(w => w.id === b);

    if (!worldA || !worldB) return { added: [], removed: [], intensityDelta: {} };

    const moodsA = Object.keys(worldA.vector);
    const moodsB = Object.keys(worldB.vector);

    const added = moodsB.filter(m => !moodsA.includes(m));
    const removed = moodsA.filter(m => !moodsB.includes(m));

    const intensityDelta: Record<string, number> = {};
    for (const m of new Set([...moodsA, ...moodsB])) {
      intensityDelta[m] = (worldB.vector[m] || 0) - (worldA.vector[m] || 0);
    }

    return { added, removed, intensityDelta };
  }, [worlds]);

  const value = useMemo(
    () => ({ worlds, activeWorldId, createWorld, switchWorld, updateWorld, diffWorlds }),
    [worlds, activeWorldId, createWorld, switchWorld, updateWorld, diffWorlds]
  );

  return (
    <EmotionalMultiverseContext.Provider value={value}>
      {children}
    </EmotionalMultiverseContext.Provider>
  );
}

export function useEmotionalMultiverseContext() {
  const ctx = useContext(EmotionalMultiverseContext);
  if (!ctx) throw new Error("useEmotionalMultiverseContext must be used inside EmotionalMultiverseProvider");
  return ctx;
}
