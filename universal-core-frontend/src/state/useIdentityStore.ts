"use client";

import { create } from "zustand";
import { MoodEntry } from "@/state/useMoodHistoryStore";

export type IdentityState = {
  traits: Record<string, number>;
  signature: Record<string, number>;
  profile: Record<string, number>;
  dominantTrait: string | null;

  computeIdentity: (history: MoodEntry[], vector: Record<string, number>) => void;
};

export const useIdentityStore = create<IdentityState>((set) => ({
  traits: {},
  signature: {},
  profile: {},
  dominantTrait: null,

  computeIdentity: (history, vector) => {
    // Traits (long-term)
    const counts: Record<string, number> = {};
    history.forEach((h) => {
      counts[h.mood] = (counts[h.mood] || 0) + 1;
    });

    const total = history.length || 1;

    const traits = {
      calmness: (counts["tired"] || 0) / total,
      reactivity: ((counts["angry"] || 0) + (counts["frustrated"] || 0)) / total,
      warmth: ((counts["happy"] || 0) + (counts["romantic"] || 0)) / total,
      playfulness: ((counts["flirty"] || 0) + (counts["excited"] || 0)) / total,
      sensitivity: ((counts["sad"] || 0) + (counts["overwhelmed"] || 0)) / total,
      resilience: 1 - ((counts["sad"] || 0) / total),
    };

    // Signature (medium-term)
    const last30 = history.slice(-30);
    const sigCounts: Record<string, number> = {};
    last30.forEach((h) => {
      sigCounts[h.mood] = (sigCounts[h.mood] || 0) + 1;
    });

    const sigTotal = last30.length || 1;
    const signature = Object.fromEntries(
      Object.entries(sigCounts).map(([m, c]) => [m, c / sigTotal])
    );

    // Profile (short-term)
    const profile = vector;

    // Dominant Trait
    const dominantTrait =
      Object.entries(traits).sort((a, b) => b[1] - a[1])[0]?.[0] || null;

    set({
      traits,
      signature,
      profile,
      dominantTrait,
    });
  },
}));
