"use client";

import { useEffect } from "react";
import { useRecoveryMode } from "./useRecoveryMode";
import { useRitualEngine } from "@/lib/dramanextdoor/useRitualEngine";
import { useNotificationEngine } from "@/lib/dramanextdoor/useNotificationEngine";

export function useRecoveryEffects() {
  const mode = useRecoveryMode();
  const rituals = useRitualEngine();
  const notifications = useNotificationEngine();

  useEffect(() => {
    if (mode === "stabilize") {
      rituals.recommend("stabilize");
      notifications.push("System entered Stabilize Mode.");
    }

    if (mode === "safe") {
      notifications.push("System entered Safe Mode.");
    }

    if (mode === "low-volatility") {
      notifications.push("System applying low-volatility damping.");
    }

    if (mode === "high-comfort") {
      notifications.push("System boosting comfort.");
    }
  }, [mode, rituals, notifications]);

  return mode;
}
