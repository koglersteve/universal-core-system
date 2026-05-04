// lafflab-frontend/src/app/api/feed/foryou/route.ts

import { NextResponse } from "next/server";
import { LaffLabApi } from "@/lib/LaffLabApi";
import { personalizedRanking } from "@/core/feed/personalizedRanking";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("user") || "user-123"; // TODO: real user ID

  // Fetch posts
  const posts = await LaffLabApi.getPosts();

  // Mock user profile (replace with real user data)
  const profile = {
    totalReactions: 100,
    emojiCounts: {
      laugh: 40,
      smile: 30,
      shock: 20,
      mindblown: 10,
    },
  };

  // Map posts into the minimal structure required by personalizedRanking
  const ranked = personalizedRanking(
    posts.map((p) => ({
      id: p.id,
      laugh: 0,
      smile: 0,
      shock: 0,
      mindblown: 0,
    })),
    profile
  );

  return NextResponse.json(ranked);
}
