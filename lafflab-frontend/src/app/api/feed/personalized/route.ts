// src/app/api/feed/personalized/route.ts

import { NextResponse } from "next/server";
import { personalizeFeed } from "@/personalization/engine";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  const feed = personalizeFeed({ userId });
  return NextResponse.json(feed);
}
