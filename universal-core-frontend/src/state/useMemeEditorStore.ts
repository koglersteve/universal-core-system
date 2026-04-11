"use client";

import { create } from "zustand";
import { nanoid } from "nanoid";

export type MemeLayer = {
  id: string;
  type: "text" | "image";
  x: number;
  y: number;
  scale: number;
  rotation: number;
  text?: string;
  src?: string;
};

type MemeEditorState = {
  layers: MemeLayer[];
  selectedId: string | null;

  // history
  history: MemeLayer[][];
  historyIndex: number;

  // actions
  addTextLayer: (text: string) => void;
  addImageLayer: (src: string) => void;
  selectLayer: (id: string | null) => void;
  updateLayer: (id: string, patch: Partial<MemeLayer>) => void;
  deleteLayer: (id: string) => void;

  // history actions
  commitHistory: () => void;
  undo: () => void;
  redo: () => void;

  // reset
  clear: () => void;
};

export const useMemeEditorStore = create<MemeEditorState>((set, get) => ({
  layers: [],
  selectedId: null,

  history: [],
  historyIndex: -1,

  addTextLayer: (text) => {
    const layer: MemeLayer = {
      id: nanoid(),
      type: "text",
      text,
      x: 100,
      y: 100,
      scale: 1,
      rotation: 0,
    };

    set((state) => ({
      layers: [...state.layers, layer],
      selectedId: layer.id,
    }));

    get().commitHistory();
  },

  addImageLayer: (src) => {
    const layer: MemeLayer = {
      id: nanoid(),
      type: "image",
      src,
      x: 100,
      y: 100,
      scale: 1,
      rotation: 0,
    };

    set((state) => ({
      layers: [...state.layers, layer],
      selectedId: layer.id,
    }));

    get().commitHistory();
  },

  selectLayer: (id) => set({ selectedId: id }),

  updateLayer: (id, patch) => {
    set((state) => ({
      layers: state.layers.map((l) =>
        l.id === id ? { ...l, ...patch } : l
      ),
    }));

    get().commitHistory();
  },

  deleteLayer: (id) => {
    set((state) => ({
      layers: state.layers.filter((l) => l.id !== id),
      selectedId: state.selectedId === id ? null : state.selectedId,
    }));

    get().commitHistory();
  },

  commitHistory: () => {
    const { layers, history, historyIndex } = get();

    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(JSON.parse(JSON.stringify(layers)));

    set({
      history: newHistory,
      historyIndex: newHistory.length - 1,
    });
  },

  undo: () => {
    const { history, historyIndex } = get();
    if (historyIndex <= 0) return;

    const newIndex = historyIndex - 1;
    set({
      layers: JSON.parse(JSON.stringify(history[newIndex])),
      historyIndex: newIndex,
    });
  },

  redo: () => {
    const { history, historyIndex } = get();
    if (historyIndex >= history.length - 1) return;

    const newIndex = historyIndex + 1;
    set({
      layers: JSON.parse(JSON.stringify(history[newIndex])),
      historyIndex: newIndex,
    });
  },

  clear: () =>
    set({
      layers: [],
      selectedId: null,
      history: [],
      historyIndex: -1,
    }),
}));
