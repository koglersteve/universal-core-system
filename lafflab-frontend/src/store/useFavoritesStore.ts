"use client";

import { create } from "zustand";
import { LaffLabApi } from "@/lib/LaffLabApi";

export interface FavoritesState {
  favorites: Set<string>;
  hydrated: boolean;
  loading: boolean;
  syncing: boolean;
  error: string | null;

  hydrate: () => Promise<void>;
  toggleFavorite: (postId: string) => Promise<void>;
  isFavorite: (id: string) => boolean;
}

const LOCAL_KEY = "favorites";

function loadLocal(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

function saveLocal(favs: Set<string>) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify([...favs]));
  } catch (err) {
    console.error("Failed to save favorites locally:", err);
  }
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: new Set(),
  hydrated: false,
  loading: false,
  syncing: false,
  error: null,

  hydrate: async () => {
    if (get().hydrated) return;

    set({ loading: true, error: null });

    try {
      const local = loadLocal();
      const remote = await LaffLabApi.getFavorites().catch(() => ({
        favorites: [],
      }));

      const merged = new Set<string>([
        ...local,
        ...(remote?.favorites ?? []),
      ]);

      saveLocal(merged);

      set({
        favorites: merged,
        hydrated: true,
        loading: false,
        error: null,
      });
    } catch (err) {
      console.error("Hydration failed:", err);

      set({
        favorites: loadLocal(),
        hydrated: true,
        loading: false,
        error: "Failed to sync favorites.",
      });
    }
  },

  toggleFavorite: async (postId: string) => {
    const prev = get().favorites;
    const next = new Set(prev);

    const wasFavorite = next.has(postId);

    if (wasFavorite) next.delete(postId);
    else next.add(postId);

    set({ favorites: next, syncing: true, error: null });
    saveLocal(next);

    try {
      if (wasFavorite) {
        await LaffLabApi.removeFavorite(postId);
      } else {
        await LaffLabApi.addFavorite(postId);
      }

      const remote = await LaffLabApi.getFavorites().catch(() => null);

      if (remote && Array.isArray(remote.favorites)) {
        const merged = new Set<string>([
          ...next,
          ...remote.favorites,
        ]);

        saveLocal(merged);

        set({
          favorites: merged,
          syncing: false,
          error: null,
        });
      } else {
        set({ syncing: false });
      }
    } catch (err) {
      console.error("Favorite sync failed:", err);

      const rollback = new Set(prev);
      saveLocal(rollback);

      set({
        favorites: rollback,
        syncing: false,
        error: "Failed to sync favorite. Try again.",
      });
    }
  },

  isFavorite: (id: string) => get().favorites.has(id),
}));
