"use client";

import { useEffect } from "react";

export type IdentityTrait =
  | "trait-calm"
  | "trait-reactive"
  | "trait-sensitive"
  | "trait-playful";

const ALL_TRAITS: IdentityTrait[] = [
  "trait-calm",
  "trait-reactive",
  "trait-sensitive",
  "trait-playful"
];

export function useEmotionalIdentity(trait?: IdentityTrait | null) {
  useEffect(() => {
    const el = document.querySelector(".os-shell") as HTMLElement | null;
    if (!el) return;

    // Remove all identity traits
    el.classList.remove(...ALL_TRAITS);

    // Apply new trait
    if (trait) {
      el.classList.add(trait);
    }

    // Cleanup on unmount → return to neutral identity
    return () => {
      el.classList.remove(...ALL_TRAITS);
    };
  }, [trait]);
}
