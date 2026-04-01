"use client";

import { useMoodContext } from "@/context/MoodContext";

export function useMood() {
  const ctx = useMoodContext();

  const { mood, intensity, timestamp } = ctx;

  return {
    ...ctx,

    // Derived helpers
    hasMood: !!mood,
    isPositive: intensity > 0,
    isNegative: intensity < 0,
    isNeutral: intensity === 0,

    // Convenience
    mood,
    intensity,
    timestamp
  };
}
