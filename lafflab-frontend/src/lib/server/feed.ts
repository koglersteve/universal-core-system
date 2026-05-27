// src/lib/server/feed.ts

import { LaffLabApi } from "@/lib/api";

// Local types (updated to match backend)
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

export async function getFeed(): Promise<FeedItem[]> {
  const data: FeedResponse = await LaffLabApi.fetchFeed({
    app: "lafflab",
    limit: 10,
  });

  return data.posts;
}
