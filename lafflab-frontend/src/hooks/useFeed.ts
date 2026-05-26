"use client";

import { useEffect, useState } from "react";
import { LaffLabApi } from "@/lib/api";

// ---------------------------------------------
// Local types (based on backend feed response)
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
          items: data.items,
          cursor: data.nextCursor,
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
