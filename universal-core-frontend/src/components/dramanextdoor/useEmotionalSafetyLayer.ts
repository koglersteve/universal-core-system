"use client";

import { useEffect, useState } from "react";

export interface SafetyEvent {
  id: string;
  type: string;
  message: string;
  timestamp: number;
  details?: any;
}

interface SafetyInputs {
  mood: number;
  tension: number;
  identityReport: any;
  canonicalHistory: any[];
  worldSwitchCount: number;
  pushNotification: (title: string, message: string) => void;
}

export function useEmotionalSafetyLayer(inputs: SafetyInputs) {
  const {
    mood,
    tension,
    identityReport,
    canonicalHistory,
    worldSwitchCount,
    pushNotification,
  } = inputs;

  const [events, setEvents] = useState<SafetyEvent[]>([]);

  function emit(type: string, message: string, details?: any) {
    const evt: SafetyEvent = {
      id: Math.random().toString(36).slice(2),
      type,
      message,
      timestamp: Date.now(),
      details,
    };

    setEvents((prev) => [evt, ...prev]);

    // Also surface as a notification
    pushNotification(type, message);
  }

  useEffect(() => {
    // RULE 1 — Prolonged high tension
    if (tension > 0.7) {
      emit(
        "High Tension",
        "Your emotional tension has been elevated for a while. A grounding ritual may help.",
        { tension }
      );
    }

    // RULE 2 — Persistent low mood
    if (mood < 25) {
      emit(
        "Low Mood",
        "Your mood has been low across several scenes. A lighter world or a short ritual might feel easier.",
        { mood }
      );
    }

    // RULE 3 — Identity drift spikes
    if (identityReport?.drift > 0.7) {
      emit(
        "Identity Drift",
        "Identity continuity is being actively stabilized. You can pause or switch to a simpler world anytime.",
        { drift: identityReport.drift }
      );
    }

    // RULE 4 — Rapid world switching
    if (worldSwitchCount >= 4) {
      emit(
        "Frequent World Switching",
        "You've been switching worlds frequently. You can anchor in one world for a bit if you'd like.",
        { worldSwitchCount }
      );
    }

    // RULE 5 — Emotional volatility in canonical timeline
    if (canonicalHistory.length >= 3) {
      const last = canonicalHistory[0];
      const prev = canonicalHistory[1];

      if (Math.abs(last.mood - prev.mood) > 30) {
        emit(
          "Emotional Volatility",
          "Your emotional state has shifted sharply. A grounding ritual or calmer world may help.",
          { last, prev }
        );
      }
    }
  }, [
    mood,
    tension,
    identityReport,
    canonicalHistory,
    worldSwitchCount,
  ]);

  return {
    events,
  };
}
