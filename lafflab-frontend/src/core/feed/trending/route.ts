import { NextResponse } from "next/server";
import { LaffLabApi } from "@/lib/LaffLabApi";
import { rankPostsForTrending } from "@/core/feed/trending";

export async function GET() {
  const posts = await LaffLabApi.getPosts();
  const ranked = rankPostsForTrending(posts);

  return NextResponse.json(ranked);
}
