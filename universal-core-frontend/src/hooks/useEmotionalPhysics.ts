"use client";

import { useEmotionalPhysicsContext } from "@/context/EmotionalPhysicsContext";

export function useEmotionalPhysics() {
  const ctx = useEmotionalPhysicsContext();

  const {
    vector,
    velocity,
    intensity,
    dominantMood,
    applyForce,
    tick
  } = ctx;

  return {
    ...ctx,

    // Derived helpers
    isStable: velocity < 0.1,
    isRising: velocity > 0,
    isFalling: velocity < 0,
    energy: intensity * Math.abs(velocity),
    momentum: intensity * velocity,

    // Re‑exposed actions
    applyForce,
    tick,

    // Convenience
    dominantMood
  };
}
