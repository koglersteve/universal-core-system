"use client";

import { LaffLabApi } from "@/lib/api";
import { useRitualStore } from "@/store/useRitualStore";

export function useRitual() {
  const ritual = useRitualStore((s) => s.ritual);
  const loading = useRitualStore((s) => s.loading);
  const error = useRitualStore((s) => s.error);
  const setRitual = useRitualStore((s) => s.setRitual);
  const setLoading = useRitualStore((s) => s.setLoading);
  const setError = useRitualStore((s) => s.setError);

  async function generateRitual() {
    try {
      setLoading(true);
      setError(null);
      const data = await LaffLabApi.generateRitual();
      setRitual(data);
    } catch (err: any) {
      setError(err.message || "Failed to generate ritual");
    } finally {
      setLoading(false);
    }
  }

  return { ritual, loading, error, generateRitual };
}
