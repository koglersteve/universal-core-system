import { NextResponse } from "next/server";
import { LaffLabApi } from "@/lib/LaffLabApi";
import { getTrendingPosts } from "@/core/feed/trending";

export async function GET() {
  const posts = await LaffLabApi.getPosts();
  const trending = getTrendingPosts(posts);
  return NextResponse.json({ trending });
}
