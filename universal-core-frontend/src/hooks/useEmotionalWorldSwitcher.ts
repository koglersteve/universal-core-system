"use client";

import { useEffect } from "react";

export type WorldTheme =
  | "world-theme-soft"
  | "world-theme-chaotic"
  | "world-theme-calm"
  | "world-theme-dark"
  | "world-theme-bright";

const ALL_WORLD_THEMES: WorldTheme[] = [
  "world-theme-soft",
  "world-theme-chaotic",
  "world-theme-calm",
  "world-theme-dark",
  "world-theme-bright"
];

export function useEmotionalWorldSwitcher(
  world?: WorldTheme | null,
  fadeDuration: number = 200
) {
  useEffect(() => {
    const el = document.querySelector(".emotion-layer") as HTMLElement | null;
    if (!el) return;

    // Remove all world themes
    el.classList.remove(...ALL_WORLD_THEMES);

    // Fade out
    el.style.transition = `opacity ${fadeDuration}ms ease`;
    el.style.opacity = "0";

    const timeout = setTimeout(() => {
      if (world) el.classList.add(world);
      el.style.opacity = "1";
    }, fadeDuration);

    // Cleanup on unmount
    return () => {
      clearTimeout(timeout);
      el.classList.remove(...ALL_WORLD_THEMES);
      el.style.opacity = "1";
    };
  }, [world, fadeDuration]);
}
