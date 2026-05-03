import { NextResponse } from "next/server";
import { getReactionsForPost, getAggregatedCounts } from "@/core/reactions/engine";

export async function GET() {
  // In a real system, you'd filter by creatorId
  // For now, return summary for all posts in memory
  // Group by postId
  const map = new Map<
    string,
    {
      postId: string;
      total: number;
      counts: Record<string, number>;
    }
  >();

  // naive: we don't have a global list of postIds here,
  // so we rely on events
  // (you can later wire in a Post store)
  const allPostIds = new Set<string>();

  // engine doesn't expose all events, so we adapt:
  // you can add a getAllEvents() if you want more power
  // For now, assume you extend engine with:
  // export function getAllEvents(): ReactionEvent[] { return store.events; }

  // ---- ADD THIS TO engine.ts ----
  // export function getAllEvents(): ReactionEvent[] {
  //   return [...store.events];
  // }
  // --------------------------------

  // @ts-ignore - assuming you added getAllEvents
  const { getAllEvents } = await import("@/core/reactions/engine");
  const events = getAllEvents();

  for (const e of events) {
    allPostIds.add(e.postId);
  }

  for (const postId of allPostIds) {
    const counts = getAggregatedCounts(postId);
    const total = Object.values(counts).reduce((a, b) => a + b, 0);

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
