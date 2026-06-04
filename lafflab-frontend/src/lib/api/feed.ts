import { get } from "./httpclient";

export interface FeedItem {
  id: string;
  content: string;
  createdAt: string;
  author?: {
    id?: string;
    username?: string;
    screenName?: string;
  };
  reactions?: Record<string, number>;
}

export interface FeedResponse {
  items: FeedItem[];
  nextCursor: string | null;
}

/**
 * Fetch paginated feed items from the backend.
 * Uses the universal httpclient (SSR‑safe).
 */
export async function fetchFeed(
  cursor: string | null = null,
  limit: number = 10
): Promise<FeedResponse> {
  const params = new URLSearchParams();
  params.set("limit", String(limit));
  params.set("app", "lafflab");

  if (cursor) {
    params.set("cursor", cursor);
  }

  return get<FeedResponse>(`/core/feed?${params.toString()}`);
}