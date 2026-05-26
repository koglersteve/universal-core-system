import { create } from "zustand";
import { LaffLabApi } from "@/lib/api";

// ---------------------------------------------
// Local types (same as useFeed + server/feed)
// ---------------------------------------------
export type FeedItem = {
  id: string;
  content: string;
  createdAt: string;
  author?: { username?: string };
};

export type FeedResponse = {
  items: FeedItem[];
  nextCursor: string | null;
};

type FeedState = {
  posts: FeedItem[];
  cursor: string | null;
  loading: boolean;
  error: string | null;

  loadInitial: () => Promise<void>;
  loadMore: () => Promise<void>;
};

export const useFeedStore = create<FeedState>((set, get) => ({
  posts: [],
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
        posts: data.items,
        cursor: data.nextCursor,
        loading: false,
        error: null,
      });
    } catch (err) {
      set({ loading: false, error: "Failed to load feed" });
    }
  },

  loadMore: async () => {
    const { cursor, posts } = get();
    if (!cursor) return;

    set({ loading: true });

    try {
      const data: FeedResponse = await LaffLabApi.fetchFeed({
        app: "lafflab",
        cursor,
        limit: 10,
      });

      set({
        posts: [...posts, ...data.items],
        cursor: data.nextCursor,
        loading: false,
        error: null,
      });
    } catch (err) {
      set({ loading: false, error: "Failed to load more posts" });
    }
  },
}));
