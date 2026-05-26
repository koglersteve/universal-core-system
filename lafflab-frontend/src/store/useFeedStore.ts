"use client";

import { create } from "zustand";
import type { Post } from "@/types/post";

async function fetchFeedClient(params: {
  app: string;
  cursor?: string | null;
  limit?: number;
}) {
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL;

  const query = new URLSearchParams();
  query.set("app", params.app);
  if (params.cursor) query.set("cursor", params.cursor);
  if (params.limit) query.set("limit", String(params.limit));

  const res = await fetch(`${backend}/core/lafflab/feed?${query.toString()}`, {
    cache: "no-store",
  });

  return res.json();
}

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
      const data = await fetchFeedClient({ app, limit: 10 });
      set({
        posts: data.items ?? [],
        cursor: data.nextCursor ?? null,
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
      const data = await fetchFeedClient({ app, cursor, limit: 10 });
      set({
        posts: [...posts, ...(data.items ?? [])],
        cursor: data.nextCursor ?? null,
        loading: false,
      });
    } catch {
      set({ loading: false });
    }
  },

  refresh: async (app: string) => {
    try {
      set({ loading: true, error: null });
      const data = await fetchFeedClient({ app, limit: 10 });
      set({
        posts: data.items ?? [],
        cursor: data.nextCursor ?? null,
        loading: false,
      });
    } catch {
      set({ error: "Failed to refresh feed", loading: false });
    }
  },
}));
