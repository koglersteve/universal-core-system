// src/lib/plugins.ts
import type { AppId } from "./types";

export type PluginMeta = {
  id: AppId;
  name: string;
  path: string;
  icon: string;
  category?: "emotion" | "meme" | "relationship" | "neighborhood" | "humor" | "system";
  description?: string;
};

export const plugins: PluginMeta[] = [
  {
    id: "moodcheck",
    name: "MoodCheck",
    path: "/moodcheck",
    icon: "🌡️",
    category: "emotion",
    description: "Scan, detect, and route emotional state across apps."
  },
  {
    id: "lafflab",
    name: "LAFFlab",
    path: "/lafflab",
    icon: "😂",
    category: "humor",
    description: "Short‑form comedy, chaotic energy, and meme reactions."
  },
  {
    id: "mememydog",
    name: "MemeMyDog",
    path: "/mememydog",
    icon: "🐶",
    category: "meme",
    description: "Dog memes with emotional overlays and sticker packs."
  },
  {
    id: "mememycat",
    name: "MemeMyCat",
    path: "/mememycat",
    icon: "🐱",
    category: "meme",
    description: "Cat memes with attitude, judgment, and emotional tone."
  },
  {
    id: "idlyily",
    name: "IDLYILY",
    path: "/idlyily",
    icon: "❤️",
    category: "relationship",
    description: "Romantic, flirty, and emotional‑context prompts."
  },
  {
    id: "hoa-meme",
    name: "HOA Meme",
    path: "/hoa-meme",
    icon: "🏘️",
    category: "neighborhood",
    description: "Neighborhood drama, HOA chaos, and suburban memes."
  },
  {
    id: "dramanextdoor",
    name: "DramaNextDoor",
    path: "/dramanextdoor",
    icon: "🎭",
    category: "neighborhood",
    description: "Local drama generator with emotional routing."
  },

  // --- Optional future system plugins ---
  {
    id: "emotional-multiverse" as AppId,
    name: "Emotional Multiverse",
    path: "/multiverse",
    icon: "🌀",
    category: "system",
    description: "Worlds, merges, emotional physics, and continuity."
  },
  {
    id: "stability-console" as AppId,
    name: "Stability Console",
    path: "/stability",
    icon: "📊",
    category: "system",
    description: "Crash, freeze, ANR, and performance analytics."
  },
  {
    id: "deeplink-inspector" as AppId,
    name: "DeepLink Inspector",
    path: "/deeplinks",
    icon: "🧭",
    category: "system",
    description: "Trace emotional deep links across apps."
  }
];

