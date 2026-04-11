"use client";

import { ReactNode } from "react";
import { useWorldThemeStore } from "@/state/useWorldThemeStore";  // ← FIXED

export function WorldBackdrop({ children }: { children: ReactNode }) {
  const world = useWorldThemeStore((s) => s.world);  // e.g. "world-theme-calm"

  return (
    <div className={`world-backdrop ${world || ""}`}>
      {children}
    </div>
  );
}

