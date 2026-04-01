"use client";

import { useEmotionalMultiverseContext } from "@/context/EmotionalMultiverseContext";

export function useEmotionalMultiverse() {
  const ctx = useEmotionalMultiverseContext();

  const {
    worlds,
    activeWorld,
    switchWorld,
    mergeWorlds,
    createWorld,
    deleteWorld
  } = ctx;

  return {
    ...ctx,

    // Derived helpers
    worldCount: worlds.length,
    hasWorlds: worlds.length > 0,
    activeWorldId: activeWorld?.id ?? null,
    activeWorldName: activeWorld?.name ?? null,

    // Re‑exposed actions (ergonomic aliases)
    switchWorld,
    mergeWorlds,
    createWorld,
    deleteWorld
  };
}
