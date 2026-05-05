import { NextResponse } from "next/server";
import { getAggregatedCounts } from "@/core/reactions/reactionStore";
import { getAllEvents } from "@/core/reactions/stream";

export async function GET() {
  const summary = {
    counts: getAggregatedCounts("*"), // or remove if not needed
    events: getAllEvents(),
  };

  return NextResponse.json(summary);
}
