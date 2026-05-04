import { NextResponse } from "next/server";
import { getAggregatedCounts, getAllEvents } from "@/core/reactions/engine";

export async function GET() {
  const events = getAllEvents();
  const allPostIds = new Set<string>();

  for (const e of events) {
    allPostIds.add(e.postId);
  }

  const map = new Map<
    string,
    {
      postId: string;
      total: number;
      counts: Record<string, number>;
    }
  >();

  for (const postId of allPostIds) {
    const counts = getAggregatedCounts(postId);
    const total = Object.values(counts).reduce((a: number, b: number) => a + b, 0);

    map.set(postId, {
      postId,
      total,
      counts,
    });
  }

  return NextResponse.json({
    ok: true,
    posts: Array.from(map.values()),
  });
}
