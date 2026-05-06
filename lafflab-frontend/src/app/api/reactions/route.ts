import { NextResponse } from "next/server";
import { getReactionCounts } from "@/core/reactions/reactionStore";
import { getAllEvents } from "@/core/reactions/stream";

export async function GET() {
  const events = getAllEvents();

  const aggregated = events.reduce<Record<string, ReturnType<typeof getReactionCounts>>>(
    (acc, event) => {
      acc[event.postId] = getReactionCounts(event.postId);
      return acc;
    },
    {}
  );

  return NextResponse.json({ aggregated });
}
