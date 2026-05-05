import { NextResponse } from "next/server";
import { personalizeFeed } from "@/personalization/engine";
import { LaffLabApi } from "@/lib/LaffLabApi";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  const posts = await LaffLabApi.getPosts();

  const feed = await personalizeFeed({
    userId,
    posts,
  });

  return NextResponse.json(feed);
}
