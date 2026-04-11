"use client";

import { useEffect, useMemo, useState } from "react";
import { useMoodStore } from "@/state/useMoodStore";

type EmotionalVector = Record<string, number>;

export function useEmotionalPhysics() {
  const mood = useMoodStore((s) => s.mood);

  const [vector, setVector] = useState<EmotionalVector>({});
  const [velocity, setVelocity] = useState(0);
  const [intensity, setIntensity] = useState(0);
  const [dominantMood, setDominantMood] = useState<string | null>(null);

  // Physics constants
  const DECAY_RATE = 0.015;
  const INERTIA = 0.25;
  const TICK_MS = 100;

  // Physics tick
  useEffect(() => {
    const interval = setInterval(() => {
      setVector((prev) => {
        const next: EmotionalVector = {};
        let totalChange = 0;

        for (const m in prev) {
          const decayed = prev[m] - DECAY_RATE;
          if (decayed > 0) {
            next[m] = decayed;
            totalChange += decayed - prev[m];
          }
        }

        setVelocity(totalChange);
        return next;
      });
    }, TICK_MS);

    return () => clearInterval(interval);
  }, []);

  // Apply new mood force
  useEffect(() => {
    if (!mood) return;

    setVector((prev) => {
      const next = { ...prev };
      const before = next[mood] || 0;

      next[mood] = Math.min(1, before + INERTIA);

      setVelocity(next[mood] - before);
      return next;
    });
  }, [mood]);

  // Compute intensity + dominant mood
  useEffect(() => {
    const entries = Object.entries(vector);
    if (entries.length === 0) {
      setIntensity(0);
      setDominantMood(null);
      return;
    }

    const total = entries.reduce((sum, [, v]) => sum + v, 0);
    setIntensity(total);

    const [topMood, topValue] = entries.sort((a, b) => b[1] - a[1])[0];
    setDominantMood(topValue > 0.05 ? topMood : null);
  }, [vector]);

  // Derived helpers
  const isStable = velocity < 0.1;
  const isRising = velocity > 0;
  const isFalling = velocity < 0;
  const energy = intensity * Math.abs(velocity);
  const momentum = intensity * velocity;

  return {
    vector,
    velocity,
    intensity,
    dominantMood,
    isStable,
    isRising,
    isFalling,
    energy,
    momentum,
  };
}
