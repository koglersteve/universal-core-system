const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? "https://universal-core-backend-production.up.railway.app";

export async function fetchFeed(params: { app: string; cursor?: string | null; limit?: number }) {
  const url = new URL("/feed", API_BASE);
  url.searchParams.set("app", params.app);
  if (params.cursor) url.searchParams.set("cursor", params.cursor);
  if (params.limit) url.searchParams.set("limit", String(params.limit));

  const res = await fetch(url.toString(), { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch feed");
  return res.json() as Promise<{ items: any[]; nextCursor: string | null }>;
}
