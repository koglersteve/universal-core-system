"use client";

import { createContext, useContext, useMemo, ReactNode } from "react";
import { useMoodHistory } from "@/hooks/useMoodHistory";
import { useEmotionalPhysics } from "@/hooks/useEmotionalPhysics";

type EmotionalIdentity = {
  traits: Record<string, number>;
  signature: Record<string, number>;
  profile: Record<string, number>;
  dominantTrait: string | null;
};

const EmotionalIdentityContext = createContext<EmotionalIdentity | undefined>(undefined);

export function EmotionalIdentityProvider({ children }: { children: ReactNode }) {
  const { history } = useMoodHistory();
  const { vector } = useEmotionalPhysics();

  // 1. Emotional Traits (long-term)
  const traits = useMemo(() => {
    const counts: Record<string, number> = {};
    history.forEach(h => {
      counts[h.mood] = (counts[h.mood] || 0) + 1;
    });

    const total = history.length || 1;

    return {
      calmness: (counts["tired"] || 0) / total,
      reactivity: ((counts["angry"] || 0) + (counts["frustrated"] || 0)) / total,
      warmth: ((counts["happy"] || 0) + (counts["romantic"] || 0)) / total,
      playfulness: ((counts["flirty"] || 0) + (counts["excited"] || 0)) / total,
      sensitivity: ((counts["sad"] || 0) + (counts["overwhelmed"] || 0)) / total,
      resilience: 1 - ((counts["sad"] || 0) / total)
    };
  }, [history]);

  // 2. Emotional Signature (medium-term)
  const signature = useMemo(() => {
    const last30 = history.slice(-30);
    const counts: Record<string, number> = {};
    last30.forEach(h => {
      counts[h.mood] = (counts[h.mood] || 0) + 1;
    });

    const total = last30.length || 1;

    return Object.fromEntries(
      Object.entries(counts).map(([m, c]) => [m, c / total])
    );
  }, [history]);

  // 3. Emotional Profile (short-term)
  const profile = useMemo(() => vector, [vector]);

  // 4. Dominant Trait
  const dominantTrait = useMemo(() => {
    const sorted = Object.entries(traits).sort((a, b) => b[1] - a[1]);
    return sorted[0]?.[0] || null;
  }, [traits]);

  const memoizedValue = useMemo(
    () => ({ traits, signature, profile, dominantTrait }),
    [traits, signature, profile, dominantTrait]
  );

  return (
    <EmotionalIdentityContext.Provider value={memoizedValue}>
      {children}
    </EmotionalIdentityContext.Provider>
  );
}

export function useEmotionalIdentityContext() {
  const ctx = useContext(EmotionalIdentityContext);
  if (!ctx) throw new Error("useEmotionalIdentityContext must be used inside EmotionalIdentityProvider");
  return ctx;
}
