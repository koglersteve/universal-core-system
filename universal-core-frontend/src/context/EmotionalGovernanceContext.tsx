"use client";

import { createContext, useContext, useState, ReactNode, useCallback, useMemo } from "react";
import { emotionalRules } from "@/lib/emotionalRules";

type GovernanceContextType = {
  lastNotification: number | null;
  lastTransition: number | null;
  canNotify: () => boolean;
  canTransition: () => boolean;
  enforceIntensity: (value: number, mood: string) => number;
  softenMood: (mood: string) => string;
};

const EmotionalGovernanceContext = createContext<GovernanceContextType | undefined>(undefined);

export function EmotionalGovernanceProvider({ children }: { children: ReactNode }) {
  const [lastNotification, setLastNotification] = useState<number | null>(null);
  const [lastTransition, setLastTransition] = useState<number | null>(null);

  const canNotify = useCallback(() => {
    const now = Date.now();
    if (!lastNotification || now - lastNotification > emotionalRules.minNotificationInterval) {
      setLastNotification(now);
      return true;
    }
    return false;
  }, [lastNotification]);

  const canTransition = useCallback(() => {
    const now = Date.now();
    if (!lastTransition || now - lastTransition > emotionalRules.minTransitionInterval) {
      setLastTransition(now);
      return true;
    }
    return false;
  }, [lastTransition]);

  const enforceIntensity = useCallback((value: number, mood: string) => {
    let v = Math.min(value, emotionalRules.maxIntensity);
    v = Math.max(v, emotionalRules.minIntensity);

    if (emotionalRules.highRiskMoods.includes(mood)) {
      v = Math.min(v, emotionalRules.negativeMoodCap);
    }

    return v;
  }, []);

  const softenMood = useCallback((mood: string) => {
    return emotionalRules.softeningMap[mood] || mood;
  }, []);

  const value = useMemo(
    () => ({
      lastNotification,
      lastTransition,
      canNotify,
      canTransition,
      enforceIntensity,
      softenMood
    }),
    [lastNotification, lastTransition, canNotify, canTransition, enforceIntensity, softenMood]
  );

  return (
    <EmotionalGovernanceContext.Provider value={value}>
      {children}
    </EmotionalGovernanceContext.Provider>
  );
}

export function useEmotionalGovernanceContext() {
  const ctx = useContext(EmotionalGovernanceContext);
  if (!ctx) throw new Error("useEmotionalGovernanceContext must be used inside EmotionalGovernanceProvider");
  return ctx;
}
