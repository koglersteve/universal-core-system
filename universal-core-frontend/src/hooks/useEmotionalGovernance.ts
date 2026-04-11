"use client";

import { emotionalRules } from "@/lib/emotionalRules";
import { useRef } from "react";

export function useEmotionalGovernance() {
  // These refs replace the old React Context state
  const lastNotification = useRef<number | null>(null);
  const lastTransition = useRef<number | null>(null);

  // Rate‑limit notifications
  const canNotify = () => {
    const now = Date.now();
    if (!lastNotification.current || now - lastNotification.current > emotionalRules.minNotificationInterval) {
      lastNotification.current = now;
      return true;
    }
    return false;
  };

  // Rate‑limit emotional transitions
  const canTransition = () => {
    const now = Date.now();
    if (!lastTransition.current || now - lastTransition.current > emotionalRules.minTransitionInterval) {
      lastTransition.current = now;
      return true;
    }
    return false;
  };

  // Enforce intensity caps + safety rules
  const enforceIntensity = (value: number, mood: string) => {
    let v = Math.min(value, emotionalRules.maxIntensity);
    v = Math.max(v, emotionalRules.minIntensity);

    if (emotionalRules.highRiskMoods.includes(mood)) {
      v = Math.min(v, emotionalRules.negativeMoodCap);
    }

    return v;
  };

  // Mood softening map
  const softenMood = (mood: string) => {
    return emotionalRules.softeningMap[mood] || mood;
  };

  // Optional derived helpers
  const canEscalate = () => canTransition() && canNotify();

  return {
    canNotify,
    canTransition,
    canEscalate,
    enforceIntensity,
    softenMood,
  };
}
