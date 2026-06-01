import { get } from "./httpclient";

export async function getFeed(cursor?: string | null, limit = 10) {
  const params = new URLSearchParams();

  params.set("limit", String(limit));
  params.set("app", "lafflab");

  if (cursor) {
    params.set("cursor", cursor);
  }

  return get<{ items: any[]; nextCursor: string | null }>(
    `/core/feed?${params.toString()}`
  );
}
