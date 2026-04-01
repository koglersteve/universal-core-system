"use client";

import { createContext, useContext, useMemo, ReactNode } from "react";
import { useEmotionalPhysics } from "@/hooks/useEmotionalPhysics";
import { useEmotionalIdentity } from "@/hooks/useEmotionalIdentity";
import { useEmotionalMultiverse } from "@/hooks/useEmotionalMultiverse";

type Theme = {
  background: string;
  accent: string;
  glow: string;
  border: string;
};

const EmotionalThemeContext = createContext<Theme | undefined>(undefined);

export function EmotionalThemeProvider({ children }: { children: ReactNode }) {
  const { dominantMood } = useEmotionalPhysics();
  const { dominantTrait } = useEmotionalIdentity();
  const { activeWorldId } = useEmotionalMultiverse();

  // 1. Mood-based theme
  const moodTheme: Record<string, Theme> = {
    happy: { background: "#1a1f00", accent: "#ffd700", glow: "#ffea00", border: "#665500" },
    sad: { background: "#0a0f1f", accent: "#6495ed", glow: "#3a5fcd", border: "#1f2a40" },
    stressed: { background: "#1f0f00", accent: "#ff8c00", glow: "#ffb347", border: "#402a00" },
    angry: { background: "#1f0000", accent: "#ff453a", glow: "#ff6b5e", border: "#401010" },
    tired: { background: "#111111", accent: "#aaaaaa", glow: "#cccccc", border: "#333333" },
    excited: { background: "#1f001a", accent: "#ff69b4", glow: "#ff85c2", border: "#401030" },
    romantic: { background: "#1f0a0f", accent: "#ffb6c1", glow: "#ffc8d4", border: "#40202a" },
    flirty: { background: "#1f0010", accent: "#ff1493", glow: "#ff4da6", border: "#401030" },
    overwhelmed: { background: "#0a1a2a", accent: "#87cefa", glow: "#add8e6", border: "#1f2f40" }
  };

  // 2. Trait-based theme (identity layer)
  const traitTheme: Record<string, Theme> = {
    calmness: { background: "#0d0f10", accent: "#88c0d0", glow: "#a3d6e0", border: "#2e3440" },
    reactivity: { background: "#1a0a0a", accent: "#ff5555", glow: "#ff7777", border: "#402020" },
    warmth: { background: "#1a120a", accent: "#ffdd99", glow: "#ffe4b5", border: "#403520" },
    playfulness: { background: "#1a0a1a", accent: "#bd93f9", glow: "#d6b3ff", border: "#302040" },
    sensitivity: { background: "#0a101a", accent: "#89b4fa", glow: "#b0c8ff", border: "#1f2a40" },
    resilience: { background: "#0a1a0a", accent: "#a6e3a1", glow: "#c3f7c0", border: "#204020" }
  };

  // 3. World-based theme (contextual layer)
  const worldTheme: Theme = {
    background: `hsl(${(activeWorldId.length * 37) % 360}, 20%, 8%)`,
    accent: `hsl(${(activeWorldId.length * 37) % 360}, 60%, 60%)`,
    glow: `hsl(${(activeWorldId.length * 37) % 360}, 70%, 70%)`,
    border: `hsl(${(activeWorldId.length * 37) % 360}, 30%, 20%)`
  };

  // Final blended theme
  const theme = useMemo(() => {
    const mood = dominantMood ? moodTheme[dominantMood] : null;
    const trait = dominantTrait ? traitTheme[dominantTrait] : null;

    const blend = (a: string | undefined, b: string | undefined, c: string) => {
      // simple blend: mood > trait > world
      return a || b || c;
    };

    return {
      background: blend(mood?.background, trait?.background, worldTheme.background),
      accent: blend(mood?.accent, trait?.accent, worldTheme.accent),
      glow: blend(mood?.glow, trait?.glow, worldTheme.glow),
      border: blend(mood?.border, trait?.border, worldTheme.border)
    };
  }, [dominantMood, dominantTrait, activeWorldId]);

  return (
    <EmotionalThemeContext.Provider value={theme}>
      {children}
    </EmotionalThemeContext.Provider>
  );
}

export function useEmotionalTheme() {
  const ctx = useContext(EmotionalThemeContext);
  if (!ctx) throw new Error("useEmotionalTheme must be used inside EmotionalThemeProvider");
  return ctx;
}
