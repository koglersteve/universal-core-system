"use client";

import { useMoodStore } from "@/state/useMoodStore";

export function useMood() {
  const mood = useMoodStore((s) => s.mood);
  const setMood = useMoodStore((s) => s.setMood);
  const clearMood = useMoodStore((s) => s.clearMood);

  return {
    mood,
    setMood,
    clearMood,
    hasMood: !!mood,
  };
}
