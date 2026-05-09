export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getReactionSummary } from "@/lib/reactions";

export async function GET() {
  const summary = await getReactionSummary();
  return NextResponse.json(summary);
}
