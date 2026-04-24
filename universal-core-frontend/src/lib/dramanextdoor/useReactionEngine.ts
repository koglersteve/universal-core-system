"use client";

import { useState, useCallback } from "react";

export type ReactionType = "like" | "laugh" | "eyeroll" | "angry";

export interface ReactionRecord {
  id: string;
  type: ReactionType;
  ts: number;
}

export function useReactionEngine() {
  const [reactions, setReactions] = useState<ReactionRecord[]>([]);
  const [lastReaction, setLastReaction] = useState<ReactionRecord | null>(null);

  // --- Add a reaction (deterministic, idempotent per item) ---
  const addReaction = useCallback((type: ReactionType) => {
    const rec: ReactionRecord = {
      id: crypto.randomUUID(),
      type,
      ts: Date.now(),
    };

    setReactions(prev => [...prev, rec]);
    setLastReaction(rec);
  }, []);

  // --- Remove a reaction by ID ---
  const removeReaction = useCallback((id: string) => {
    setReactions(prev => prev.filter(r => r.id !== id));
  }, []);

  // --- Reset all reactions ---
  const reset = useCallback(() => {
    setReactions([]);
    setLastReaction(null);
  }, []);

  // --- Totals for OS engines ---
  const totals = reactions.reduce(
    (acc, r) => {
      acc[r.type] = (acc[r.type] ?? 0) + 1;
      return acc;
    },
    {
      like: 0,
      laugh: 0,
      eyeroll: 0,
      angry: 0,
    } as Record<ReactionType, number>
  );

  // --- Reaction signature (stable emotional fingerprint) ---
  const signature = `${totals.like}-${totals.laugh}-${totals.eyeroll}-${totals.angry}`;

  return {
    reactions,
    totals,
    signature,
    lastReaction,
    addReaction,
    removeReaction,
    reset,
  };
}
