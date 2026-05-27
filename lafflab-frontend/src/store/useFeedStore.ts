// lafflab-frontend/src/store/useFeedStore.ts

"use client";

import { create } from "zustand";
import { LaffLabApi } from "@/lib/api";

export type FeedItem = {
  id: string;
  text: string;
  tags?: string[];
  isFavorite?: boolean;
  score?: number;
  mediaUrl?: string;
};

export type FeedResponse = {
  posts: FeedItem[];
  nextCursor: string | null;
};

type FeedStore = {
  items: FeedItem[];
  cursor: string | null;
  loading: boolean;
  error: string | null;

  loadInitial: () => Promise<void>;
  loadMore: () => Promise<void>;
};

export const useFeedStore = create<FeedStore>((set, get) => ({
  items: [],
  cursor: null,
  loading: false,
  error: null,

  loadInitial: async () => {
    set({ loading: true, error: null });

    try {
      const data: FeedResponse = await LaffLabApi.fetchFeed({
        app: "lafflab",
        limit: 10,
      });

      set({
        items: data.posts,
        cursor: data.nextCursor,
        loading: false,
      });
    } catch (err) {
      set({
        loading: false,
        error: "Failed to load feed",
      });
    }
  },

  loadMore: async () => {
    const { cursor, loading, items } = get();
    if (loading || !cursor) return;

    set({ loading: true });

    try {
      const data: FeedResponse = await LaffLabApi.fetchFeed({
        app: "lafflab",
        cursor,
        limit: 10,
      });

      set({
        items: [...items, ...data.posts],
        cursor: data.nextCursor,
        loading: false,
      });
    } catch (err) {
      set({
        loading: false,
        error: "Failed to load more feed",
      });
    }
  },
}));
