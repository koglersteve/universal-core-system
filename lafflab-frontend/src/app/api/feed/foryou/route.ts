// lafflab-frontend/src/app/api/feed/foryou/route.ts

import { NextResponse } from "next/server";
import { LaffLabApi } from "@/lib/LaffLabApi";
import { personalizedRanking } from "@/core/feed/personalizedRanking";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("user") || "user-123"; // TODO: real user ID

  // Fetch posts
  const posts = await LaffLabApi.getPosts();

  // Fetch user profile (mock for now)
  const profile = {
    totalReactions: 100,
    emojiCounts: {
      laugh: 40,
      smile: 30,
      shock: 20,
      mindblown: 10,
    },
  };

  // Rank posts using personalized engine
  const ranked = personalizedRanking(
    posts.map((p) => ({
      id: p.id,
      laugh: p.laugh ?? 0,
      smile: p.smile ?? 0,
      shock: p.shock ?? 0,
      mindblown: p.mindblown ?? 0,
    })),
    profile
  );

  return NextResponse.json(ranked);
}
