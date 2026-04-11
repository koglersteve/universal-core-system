"use client";

import { useMemo } from "react";
import { useMemeEditorStore } from "@/state/useMemeEditorStore";

export function useMemeEditor() {
  const layers = useMemeEditorStore((s) => s.layers);
  const selectedId = useMemeEditorStore((s) => s.selectedId);
  const addLayer = useMemeEditorStore((s) => s.addLayer);
  const updateLayer = useMemeEditorStore((s) => s.updateLayer);
  const deleteLayer = useMemeEditorStore((s) => s.deleteLayer);
  const undo = useMemeEditorStore((s) => s.undo);
  const redo = useMemeEditorStore((s) => s.redo);
  const history = useMemeEditorStore((s) => s.history);
  const future = useMemeEditorStore((s) => s.future);

  const selectedLayer = useMemo(
    () => layers.find((l) => l.id === selectedId) || null,
    [layers, selectedId]
  );

  return {
    layers,
    selectedId,
    addLayer,
    updateLayer,
    deleteLayer,
    undo,
    redo,
    history,
    future,

    // Derived helpers
    selectedLayer,
    hasSelection: !!selectedId,
    canUndo: history.length > 0,
    canRedo: future.length > 0,
  };
}
