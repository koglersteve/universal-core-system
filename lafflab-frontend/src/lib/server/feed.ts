// src/lib/server/feed.ts

import { LaffLabApi } from "@/lib/api";

// Local types (same as useFeed)
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

export async function getFeed(): Promise<FeedItem[]> {
  const data: FeedResponse = await LaffLabApi.fetchFeed({
    app: "lafflab",
    limit: 10,
  });

  return data.items;
}
