"use client";

import { useEffect } from "react";

export function useEmotionalDiff(
  ref: React.RefObject<HTMLElement>,
  delta: number | null | undefined
) {
  useEffect(() => {
    if (!ref.current || delta == null) return;

    const el = ref.current;
    const classes = ["diff-positive", "diff-negative", "diff-neutral"];

    // Clear previous state
    el.classList.remove(...classes);

    // Apply new state
    if (delta > 0) el.classList.add("diff-positive");
    else if (delta < 0) el.classList.add("diff-negative");
    else el.classList.add("diff-neutral");

    // Auto-clear after animation
    const timeout = setTimeout(() => {
      el.classList.remove(...classes);
    }, 1200);

    return () => clearTimeout(timeout);
  }, [delta]);
}

