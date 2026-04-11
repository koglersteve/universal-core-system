"use client";

import { useMultiverseStore } from "@/state/useMultiverseStore";

export function useEmotionalMultiverse() {
  const worlds = useMultiverseStore((s) => s.worlds);
  const activeWorldId = useMultiverseStore((s) => s.activeWorldId);
  const createWorld = useMultiverseStore((s) => s.createWorld);
  const switchWorld = useMultiverseStore((s) => s.switchWorld);
  const updateWorld = useMultiverseStore((s) => s.updateWorld);
  const diffWorlds = useMultiverseStore((s) => s.diffWorlds);

  const activeWorld = worlds.find((w) => w.id === activeWorldId) || null;

  return {
    worlds,
    activeWorldId,
    activeWorld,
    createWorld,
    switchWorld,
    updateWorld,
    diffWorlds,
  };
}
