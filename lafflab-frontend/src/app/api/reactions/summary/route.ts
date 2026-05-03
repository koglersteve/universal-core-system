import { NextResponse } from "next/server";
import { getAllEvents, getAggregatedCounts } from "@/core/reactions/engine";

export async function GET() {
  const events = getAllEvents();

  const byPost = new Map<
    string,
    {
      postId: string;
      counts: Record<string, number>;
      firstAt: string;
      lastAt: string;
    }
  >();

  for (const e of events) {
    if (!byPost.has(e.postId)) {
      byPost.set(e.postId, {
        postId: e.postId,
        counts: {},
        firstAt: e.createdAt,
        lastAt: e.createdAt,
      });
    }
    const entry = byPost.get(e.postId)!;
    entry.counts[e.emoji] = (entry.counts[e.emoji] || 0) + 1;
    if (e.createdAt < entry.firstAt) entry.firstAt = e.createdAt;
    if (e.createdAt > entry.lastAt) entry.lastAt = e.createdAt;
  }

  const result = Array.from(byPost.values()).map((entry) => {
    const aggregated = getAggregatedCounts(entry.postId);
    const total = Object.values(aggregated).reduce((a, b) => a + b, 0);

    return {
      postId: entry.postId,
      total,
      counts: aggregated,
      firstAt: entry.firstAt,
      lastAt: entry.lastAt,
    };
  });

  return NextResponse.json({
    ok: true,
    posts: result,
  });
}
