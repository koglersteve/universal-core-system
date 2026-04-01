"use client";

import { useEffect } from "react";
import { useMemeEditor } from "@/hooks/useMemeEditor";

const STORAGE_KEY = "emotional-os:meme-editor";

export function useMemePersistence() {
  const { state } = useMemeEditor();

  // Save on change
  useEffect(() => {
    const snapshot = {
      layers: state.layers,
      selectedId: state.selectedId
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  }, [state.layers, state.selectedId]);

  // Load once on mount (no-op until reducer supports loading)
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    try {
      JSON.parse(raw);
      // Waiting for LOAD_SNAPSHOT support
    } catch {
      // ignore
    }
  }, []);
}
