"use client";

import { create } from "zustand";
import type { Ritual } from "@/lib/api";

interface RitualState {
  ritual: Ritual | null;
  loading: boolean;
  error: string | null;
  setRitual: (ritual: Ritual | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useRitualStore = create<RitualState>((set) => ({
  ritual: null,
  loading: false,
  error: null,
  setRitual: (ritual) => set({ ritual }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
