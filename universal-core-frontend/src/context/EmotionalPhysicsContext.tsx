"use client";

import { createContext, useContext, useEffect, useState, ReactNode, useMemo } from "react";
import { useMood } from "@/hooks/useMood";

type EmotionalVector = {
  [mood: string]: number; // 0.0 to 1.0 intensity
};

type EmotionalPhysicsContextType = {
  vector: EmotionalVector;
  dominantMood: string | null;
};

const EmotionalPhysicsContext = createContext<EmotionalPhysicsContextType | undefined>(undefined);

export function EmotionalPhysicsProvider({ children }: { children: ReactNode }) {
  const { mood } = useMood();
  const [vector, setVector] = useState<EmotionalVector>({});
  const [dominantMood, setDominantMood] = useState<string | null>(null);

  // Emotional physics constants
  const DECAY_RATE = 0.015; // per tick
  const INERTIA = 0.25; // how strongly new moods push the vector
  const TICK_MS = 100; // physics tick

  // Apply emotional physics
  useEffect(() => {
    const interval = setInterval(() => {
      setVector(prev => {
        const next: EmotionalVector = {};

        // Decay all moods
        for (const m in prev) {
          const decayed = prev[m] - DECAY_RATE;
          if (decayed > 0) next[m] = decayed;
        }

        return next;
      });
    }, TICK_MS);

    return () => clearInterval(interval);
  }, []);

  // When a new mood is set, push it into the vector
  useEffect(() => {
    if (!mood) return;

    setVector(prev => {
      const next = { ...prev };
      next[mood] = (next[mood] || 0) + INERTIA;
      if (next[mood] > 1) next[mood] = 1;
      return next;
    });
  }, [mood]);

  // Compute dominant mood
  useEffect(() => {
    const entries = Object.entries(vector);
    if (entries.length === 0) {
      setDominantMood(null);
      return;
    }

    const sorted = entries.sort((a, b) => b[1] - a[1]);
    const [topMood, intensity] = sorted[0];

    setDominantMood(intensity > 0.05 ? topMood : null);
  }, [vector]);

  const contextValue = useMemo(() => ({ vector, dominantMood }), [vector, dominantMood]);

  return (
    <EmotionalPhysicsContext.Provider value={contextValue}>
      {children}
    </EmotionalPhysicsContext.Provider>
  );
}

export function useEmotionalPhysicsContext() {
  const ctx = useContext(EmotionalPhysicsContext);
  if (!ctx) throw new Error("useEmotionalPhysicsContext must be used inside EmotionalPhysicsProvider");
  return ctx;
}
