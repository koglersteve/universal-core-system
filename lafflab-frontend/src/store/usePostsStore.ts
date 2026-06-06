"use client";

import { fetchFeed, type FeedItem, type FeedResponse } from "@/lib/api/feed";

export async function fetchPosts(): Promise<FeedItem[]> {
  const data: FeedResponse = await fetchFeed(null, 10);
  return data.items;
}