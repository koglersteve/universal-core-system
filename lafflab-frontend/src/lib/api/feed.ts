"use client";

import { create } from "zustand";
import { fetchFeed, type FeedItem, type FeedResponse } from "@/lib/api/feed";

type FeedState = {
  posts: FeedItem[];
  cursor: string | null;
  loading: boolean;
  done: boolean;
  load: () => Promise<void>;
};

export const useFeedStore = create<FeedState>((set, get) => ({
  posts: [],
  cursor: null,
  loading: false,
  done: false,

  load: async () => {
    const { loading, done, cursor, posts } = get();
    if (loading || done) return;

    set({ loading: true });

    try {
      const data: FeedResponse = await fetchFeed(cursor, 10);

      set({
        posts: [...posts, ...data.items],
        cursor: data.nextCursor,
        done: data.nextCursor === null,
      });
    } catch (err) {
      console.error("Feed load failed:", err);
    }

    set({ loading: false });
  },
}));