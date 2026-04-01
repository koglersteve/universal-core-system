// src/lib/plugins.ts
import type { AppId } from "./types";

export type PluginMeta = {
  id: AppId;
  name: string;
  path: string;
  icon: string;
  category: "emotion" | "meme" | "relationship" | "neighborhood";
  description?: string;
  order?: number;
  enabled?: boolean;
};

export const plugins: PluginMeta[] = [
  {
    id: "moodcheck",
    name: "MoodCheck",
    path: "/moodcheck",
    icon: "🌡️",
    category: "emotion",
    description: "Read, track, and visualize emotional packets.",
    order: 1,
    enabled: true
  },
  {
    id: "lafflab",
    name: "LAFFlab",
    path: "/lafflab",
    icon: "😂",
    category: "meme",
    description: "Generate humor, memes, and comedic emotional reactions.",
    order: 2,
    enabled: true
  },
  {
    id: "mememydog",
    name: "MemeMyDog",
    path: "/mememydog",
    icon: "🐶",
    category: "meme",
    description: "Dog‑powered meme generator with attitude tuning.",
    order: 3,
    enabled: true
  },
  {
    id: "mememycat",
    name: "MemeMyCat",
    path: "/mememycat",
    icon: "🐱",
    category: "meme",
    description: "Cat‑powered meme generator with personality sliders.",
    order: 4,
    enabled: true
  },
  {
    id: "idlyily",
    name: "IDLYILY",
    path: "/idlyily",
    icon: "❤️",
    category: "relationship",
    description: "Relationship prompts, emotional tuning, and romantic insights.",
    order: 5,
    enabled: true
  },
  {
    id: "hoa-meme",
    name: "HOA Meme",
    path: "/hoa-meme",
    icon: "🏘️",
    category: "neighborhood",
    description: "HOA‑themed meme generator with local drama tuning.",
    order: 6,
    enabled: true
  },
  {
    id: "dramanextdoor",
    name: "DramaNextDoor",
    path: "/dramanextdoor",
    icon: "🎭",
    category: "neighborhood",
    description: "Neighborhood drama simulator with emotional reactions.",
    order: 7,
    enabled: true
  }
];

// Helpers
export const getPlugin = (id: AppId) =>
  plugins.find(p => p.id === id) || null;

export const getPluginPath = (id: AppId) =>
  getPlugin(id)?.path ?? null;

export const isPlugin = (id: string): id is AppId =>
  plugins.some(p => p.id === id);
