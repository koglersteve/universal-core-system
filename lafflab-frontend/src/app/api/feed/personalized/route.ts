import { NextResponse } from "next/server";
import { getPersonalizedFeed } from "@/personalization/engine";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("user") ?? "anonymous";
  const sessionId = searchParams.get("session") ?? "default";

  const { ranked } = await getPersonalizedFeed({ userId, sessionId });

  return NextResponse.json(ranked);
}
