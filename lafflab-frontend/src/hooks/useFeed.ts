// src/hooks/useFeed.ts
"use client";

import { useEffect, useState } from "react";
import { LaffLabApi, type FeedItem, type FeedResponse } from "@/lib/api";

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
