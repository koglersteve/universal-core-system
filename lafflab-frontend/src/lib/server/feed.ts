import { LaffLabApi } from "@/lib/api";

export interface FeedItem {
  id: string;
  content: string;
  createdAt: string;
  author: {
    id: string;
    username: string;
    avatarUrl: string | null;
  };
}

export interface FeedResponse {
  items: FeedItem[];
  nextCursor: string | null;
}

export async function getFeed(): Promise<FeedItem[]> {
  const data: FeedResponse = await LaffLabApi.fetchFeed({
    limit: 10,
  });

  return data.items;
}
