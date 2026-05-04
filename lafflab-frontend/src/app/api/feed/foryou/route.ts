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
      hysterical: 40,
      laughing: 30,
      expressionless: 10,
      shock: 8,
      mindblown: 6,
      angry: 4,
      crickets: 2,
    },
  };

  // Minimal structure required by personalizedRanking
  const ranked = personalizedRanking(
    posts.map((p) => ({
      id: p.id,
      hysterical: 0,
      laughing: 0,
      expressionless: 0,
      shock: 0,
      mindblown: 0,
      angry: 0,
      crickets: 0,
    })),
    profile
  );

  return NextResponse.json(ranked);
}
