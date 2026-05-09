"use client";

import { create } from "zustand";
import { Post } from "@/types/post";

type FeedState = {
  posts: Post[];
  loading: boolean;
  error: string | null;

  loadInitial: () => Promise<void>;
  loadMore: () => Promise<void>;
  refresh: () => Promise<void>;
};

export const useFeedStore = create<FeedState>((set, get) => ({
  posts: [],
  loading: false,
  error: null,

  loadInitial: async () => {
    try {
      set({ loading: true, error: null });
      const res = await fetch("/api/feed", { cache: "no-store" });
      const data: Post[] = await res.json();
      set({ posts: data, loading: false });
    } catch (err) {
      set({ error: "Failed to load feed", loading: false });
    }
  },

  loadMore: async () => {
    try {
      const current = get().posts;
      const last = current[current.length - 1];

      const res = await fetch("/api/feed?after=" + last?.id, {
        cache: "no-store"
      });

      const data: Post[] = await res.json();
      set({ posts: [...current, ...data] });
    } catch {
      /* silent fail for infinite scroll */
    }
  },

  refresh: async () => {
    try {
      set({ loading: true, error: null });
      const res = await fetch("/api/feed", { cache: "no-store" });
      const data: Post[] = await res.json();
      set({ posts: data, loading: false });
    } catch {
      set({ error: "Failed to refresh feed", loading: false });
    }
  }
}));

