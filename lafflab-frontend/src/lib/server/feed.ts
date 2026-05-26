// src/lib/server/feed.ts

import { LaffLabApi } from "@/lib/api";
import type { FeedItem, FeedResponse } from "@/lib/api";

export async function getFeed(): Promise<FeedItem[]> {
  const data: FeedResponse = await LaffLabApi.fetchFeed({
    app: "lafflab",
    limit: 10,
  });
  return data.items;
}

export async function getForYouFeed(): Promise<FeedItem[]> {
  const data: FeedResponse = await LaffLabApi.fetchFeed({
    app: "lafflab",
    limit: 10,
  });
  return data.items;
}
