"use client";

import { usePhysics } from "@/context/EmotionalPhysicsContext";

export function PhysicsPulse({ children }: { children: React.ReactNode }) {
  const physics = usePhysics(); // { velocity, intensity }

  const className =
    physics.velocity > 5
      ? "physics-velocity fast"
      : physics.velocity > 1
      ? "physics-velocity slow"
      : "physics-velocity idle";

  return <div className={className}>{children}</div>;
}
