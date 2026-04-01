"use client";

import { useEffect } from "react";

export type MoodClass =
  | "emotion-happy"
  | "emotion-sad"
  | "emotion-stressed"
  | "emotion-angry"
  | "emotion-tired"
  | "emotion-excited"
  | "emotion-romantic"
  | "emotion-flirty"
  | "emotion-annoyed"
  | "emotion-frustrated"
  | "emotion-overwhelmed";

export type WorldClass =
  | "world-theme-soft"
  | "world-theme-chaotic"
  | "world-theme-calm"
  | "world-theme-dark"
  | "world-theme-bright";

const ALL_MOODS: MoodClass[] = [
  "emotion-happy",
  "emotion-sad",
  "emotion-stressed",
  "emotion-angry",
  "emotion-tired",
  "emotion-excited",
  "emotion-romantic",
  "emotion-flirty",
  "emotion-annoyed",
  "emotion-frustrated",
  "emotion-overwhelmed"
];

const ALL_WORLDS: WorldClass[] = [
  "world-theme-soft",
  "world-theme-chaotic",
  "world-theme-calm",
  "world-theme-dark",
  "world-theme-bright"
];

interface EmotionLayerOptions {
  mood?: MoodClass | null;
  world?: WorldClass | null;
  flash?: boolean;
  fadeDuration?: number; // new
}

export function useEmotionLayer({
  mood,
  world,
  flash,
  fadeDuration = 200
}: EmotionLayerOptions) {
  useEffect(() => {
    const el = document.querySelector(".emotion-layer") as HTMLElement | null;
    if (!el) return;

    // Remove all mood + world classes
    el.classList.remove(...ALL_MOODS, ...ALL_WORLDS);

    // Apply mood
    if (mood) el.classList.add(mood);

    // Apply world theme
    if (world) el.classList.add(world);

    // Flash effect
    let flashEl: HTMLDivElement | null = null;
    let flashTimeout: NodeJS.Timeout | null = null;

    if (flash) {
      flashEl = document.createElement("div");
      flashEl.className = "emotion-flash";
      el.appendChild(flashEl);

      flashTimeout = setTimeout(() => {
        flashEl?.remove();
      }, 900);
    }

    // Cleanup on unmount
    return () => {
      el.classList.remove(...ALL_MOODS, ...ALL_WORLDS);
      if (flashTimeout) clearTimeout(flashTimeout);
      flashEl?.remove();
    };
  }, [mood, world, flash, fadeDuration]);
}
