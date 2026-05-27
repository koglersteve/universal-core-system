"use client";

import { useEffect, useState } from "react";
import { LaffLabApi } from "@/lib/api";

// ---------------------------------------------
// Local types (based on NEW backend feed response)
// ---------------------------------------------
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

type UseFeedState = {
  items: FeedItem[];
  loading: boolean;
  error: string | null;
  cursor: string | null;
};

export function useFeed() {
  const [state, setState] = useState<UseFeedState>({
    items: [],
    loading: true,
    error: null,
    cursor: null,
  });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const data: FeedResponse = await LaffLabApi.fetchFeed({
          app: "lafflab",
          limit: 10,
        });

        if (cancelled) return;

        setState({
          items: data.posts,       // ← FIXED
          cursor: data.nextCursor, // ← FIXED
          loading: false,
          error: null,
        });
      } catch (err) {
        if (cancelled) return;
        setState(prev => ({
          ...prev,
          loading: false,
          error: "Failed to load feed",
        }));
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
