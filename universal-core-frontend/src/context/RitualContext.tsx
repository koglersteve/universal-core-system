"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode
} from "react";

import { useMoodHistory } from "@/hooks/useMoodHistory";
import { useEmotionalNotifications } from "@/hooks/useEmotionalNotifications";
import { useEmotionalPhysics } from "@/hooks/useEmotionalPhysics";
import { useEmotionalGovernance } from "@/hooks/useEmotionalGovernance";

type RitualContextType = {
  lastDailyRitual: number | null;
  lastWeeklyRitual: number | null;
};

const RitualContext = createContext<RitualContextType | undefined>(undefined);

export function RitualProvider({ children }: { children: ReactNode }) {
  const { history } = useMoodHistory();
  const { pushNotification } = useEmotionalNotifications();
  const { dominantMood } = useEmotionalPhysics();
  const { canNotify } = useEmotionalGovernance();

  const [lastDailyRitual, setLastDailyRitual] = useState<number | null>(
    () => Number(localStorage.getItem("lastDailyRitual")) || null
  );

  const [lastWeeklyRitual, setLastWeeklyRitual] = useState<number | null>(
    () => Number(localStorage.getItem("lastWeeklyRitual")) || null
  );

  // Persist timestamps
  useEffect(() => {
    if (lastDailyRitual) {
      localStorage.setItem("lastDailyRitual", String(lastDailyRitual));
    }
  }, [lastDailyRitual]);

  useEffect(() => {
    if (lastWeeklyRitual) {
      localStorage.setItem("lastWeeklyRitual", String(lastWeeklyRitual));
    }
  }, [lastWeeklyRitual]);

  // Daily ritual trigger
  useEffect(() => {
    if (!canNotify()) return;

    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;

    if (!lastDailyRitual || now - lastDailyRitual > oneDay) {
      pushNotification({
        type: "ritual",
        title: "Daily Emotional Check‑In",
        message:
          dominantMood
            ? `How are you feeling today? Your current emotional state seems ${dominantMood}.`
            : "Take a moment to check in with yourself today."
      });

      setLastDailyRitual(now);
    }
  }, [lastDailyRitual, dominantMood, canNotify, pushNotification]);

  // Weekly ritual trigger
  useEffect(() => {
    if (!canNotify()) return;

    const now = Date.now();
    const oneWeek = 7 * 24 * 60 * 60 * 1000;

    if (!lastWeeklyRitual || now - lastWeeklyRitual > oneWeek) {
      const moods = history.map(h => h.mood);
      const summary = moods.length
        ? `Your week included: ${[...new Set(moods)].join(", ")}`
        : "No emotional data yet.";

      pushNotification({
        type: "ritual",
        title: "Weekly Emotional Reflection",
        message: summary
      });

      setLastWeeklyRitual(now);
    }
  }, [lastWeeklyRitual, history, canNotify, pushNotification]);

  return (
    <RitualContext.Provider value={{ lastDailyRitual, lastWeeklyRitual }}>
      {children}
    </RitualContext.Provider>
  );
}

export function useRitualContext() {
  const ctx = useContext(RitualContext);
  if (!ctx) throw new Error("useRitualContext must be used inside RitualProvider");
  return ctx;
}
