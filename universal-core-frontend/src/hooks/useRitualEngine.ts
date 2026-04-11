"use client";

import { useEffect } from "react";
import { useRitualStore } from "@/state/useRitualStore";
import { useMoodHistoryStore } from "@/state/useMoodHistoryStore";
import { useEmotionalNotifications } from "@/hooks/useEmotionalNotifications";
import { useEmotionalPhysics } from "@/hooks/useEmotionalPhysics";
import { useEmotionalGovernance } from "@/hooks/useEmotionalGovernance";

export function useRitualEngine() {
  const { history } = useMoodHistoryStore();
  const { pushNotification } = useEmotionalNotifications();
  const { dominantMood } = useEmotionalPhysics();
  const { canNotify } = useEmotionalGovernance();

  const {
    lastDailyRitual,
    lastWeeklyRitual,
    setLastDailyRitual,
    setLastWeeklyRitual,
    loadFromStorage,
  } = useRitualStore();

  // Load persisted timestamps
  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  // Daily ritual
  useEffect(() => {
    if (!canNotify()) return;

    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;

    if (!lastDailyRitual || now - lastDailyRitual > oneDay) {
      pushNotification({
        type: "ritual",
        title: "Daily Emotional Check‑In",
        message: dominantMood
          ? `How are you feeling today? Your current emotional state seems ${dominantMood}.`
          : "Take a moment to check in with yourself today.",
      });

      setLastDailyRitual(now);
    }
  }, [lastDailyRitual, dominantMood, canNotify, pushNotification, setLastDailyRitual]);

  // Weekly ritual
  useEffect(() => {
    if (!canNotify()) return;

    const now = Date.now();
    const oneWeek = 7 * 24 * 60 * 60 * 1000;

    if (!lastWeeklyRitual || now - lastWeeklyRitual > oneWeek) {
      const moods = history.map((h) => h.mood);
      const summary = moods.length
        ? `Your week included: ${[...new Set(moods)].join(", ")}`
        : "No emotional data yet.";

      pushNotification({
        type: "ritual",
        title: "Weekly Emotional Reflection",
        message: summary,
      });

      setLastWeeklyRitual(now);
    }
  }, [lastWeeklyRitual, history, canNotify, pushNotification, setLastWeeklyRitual]);
}
