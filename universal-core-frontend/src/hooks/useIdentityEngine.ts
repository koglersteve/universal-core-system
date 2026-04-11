"use client";

import { useEffect } from "react";
import { useIdentityStore } from "@/state/useIdentityStore";
import { useMoodHistoryStore } from "@/state/useMoodHistoryStore";
import { useEmotionalPhysics } from "@/hooks/useEmotionalPhysics";

export function useIdentityEngine() {
  const { history } = useMoodHistoryStore();
  const { vector } = useEmotionalPhysics();
  const computeIdentity = useIdentityStore((s) => s.computeIdentity);

  useEffect(() => {
    computeIdentity(history, vector);
  }, [history, vector, computeIdentity]);
}
