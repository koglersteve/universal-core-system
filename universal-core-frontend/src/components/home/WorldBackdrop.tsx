"use client";

import { useWorldTheme } from "@/context/EmotionalMultiverseContext";

export function WorldBackdrop({ children }: { children: React.ReactNode }) {
  const world = useWorldTheme(); // e.g. "world-theme-calm"

  return (
    <div className={`world-backdrop ${world || ""}`}>
      {children}
    </div>
  );
}
