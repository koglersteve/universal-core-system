"use client";

import { create } from "zustand";
import type { Post } from "@/types/post";
import { LaffLabApi } from "@/lib/api";

type FeedState = {
  posts: Post[];
  cursor: string | null;
  loading: boolean;
  error: string | null;

  loadInitial: (app: string) => Promise<void>;
  loadMore: (app: string) => Promise<void>;
  refresh: (app: string) => Promise<void>;
};

export const useFeedStore = create<FeedState>((set, get) => ({
  posts: [],
  cursor: null,
  loading: false,
  error: null,

  loadInitial: async (app: string) => {
    try {
      set({ loading: true, error: null });
      const data = await LaffLabApi.fetchFeed({ app, limit: 10 });
      set({
        posts: data.items,
        cursor: data.nextCursor,
        loading: false,
      });
    } catch {
      set({ error: "Failed to load feed", loading: false });
    }
  },

  loadMore: async (app: string) => {
    const { cursor, posts, loading } = get();
    if (loading || !cursor) return;

    try {
      set({ loading: true });
      const data = await LaffLabApi.fetchFeed({ app, cursor, limit: 10 });
      set({
        posts: [...posts, ...data.items],
        cursor: data.nextCursor,
        loading: false,
      });
    } catch {
      set({ loading: false });
    }
  },

  refresh: async (app: string) => {
    try {
      set({ loading: true, error: null });
      const data = await LaffLabApi.fetchFeed({ app, limit: 10 });
      set({
        posts: data.items,
        cursor: data.nextCursor,
        loading: false,
      });
    } catch {
      set({ error: "Failed to refresh feed", loading: false });
    }
  },
}));

