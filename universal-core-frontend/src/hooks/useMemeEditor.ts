"use client";

import { useContext, useMemo } from "react";
import { MemeEditorContext } from "@/context/MemeEditorContext";

export function useMemeEditor() {
  const ctx = useContext(MemeEditorContext);

  if (!ctx) {
    throw new Error("useMemeEditor must be used within MemeEditorProvider");
  }

  const {
    layers,
    selectedId,
    addLayer,
    updateLayer,
    deleteLayer,
    undo,
    redo,
    history,
    future
  } = ctx;

  const selectedLayer = useMemo(
    () => layers.find(l => l.id === selectedId) || null,
    [layers, selectedId]
  );

  return {
    ...ctx,

    // Derived helpers
    selectedLayer,
    hasSelection: !!selectedId,
    canUndo: history.length > 0,
    canRedo: future.length > 0
  };
}
