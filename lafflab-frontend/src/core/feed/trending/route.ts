import { NextResponse } from "next/server";
import { LaffLabApi } from "@/lib/api";
import { getTrendingPosts } from "@/core/feed/trending";

export async function GET() {
  // If getTrendingPosts() already fetches from backend, use it.
  // Otherwise, use LaffLabApi.getTrending()

  const posts = await getTrendingPosts();

  return NextResponse.json({ posts });
}
