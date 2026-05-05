// src/core/feed/trending/route.ts

import { NextResponse } from "next/server";
import { LaffLabApi } from "@/lib/LaffLabApi";
import { rankTrendingPosts } from "@/core/feed/trending";

export async function GET() {
  const posts = await LaffLabApi.getPosts();
  const ranked = rankTrendingPosts(posts);
  return NextResponse.json(ranked);
}
