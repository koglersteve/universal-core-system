"use client";

import { useEmotionalGovernanceContext } from "@/context/EmotionalGovernanceContext";

export function useEmotionalGovernance() {
  const ctx = useEmotionalGovernanceContext();

  return {
    ...ctx,

    // Derived helpers (optional but useful)
    isSafe: ctx.safetyMode === "safe",
    isSoftened: ctx.safetyMode === "softened",
    canNotify: ctx.canNotify,
    canTransition: ctx.canTransition,
    canEscalate: ctx.canEscalate
  };
}
