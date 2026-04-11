"use client";

import { ReactNode } from "react";
import { useEmotionalPhysics } from "@/hooks/useEmotionalPhysics";  // ← FIXED

export function PhysicsPulse({ children }: { children: ReactNode }) {
  const { velocity } = useEmotionalPhysics();  // ← FIXED

  const className =
    velocity > 5
      ? "physics-velocity fast"
      : velocity > 1
      ? "physics-velocity slow"
      : "physics-velocity idle";

  return <div className={className}>{children}</div>;
}
