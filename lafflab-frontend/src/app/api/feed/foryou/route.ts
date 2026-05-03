import { NextResponse } from "next/server";
import { LaffLabApi } from "@/lib/LaffLabApi";
import { scorePostForUser } from "@/core/feed/personalizedRanking";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId") || "anonymous";

  const posts = await LaffLabApi.getPosts();

  const ranked = posts
    .map((p) => ({
      ...p,
      score: scorePostForUser(p, userId),
    }))
    .sort((a, b) => b.score - a.score);

  return NextResponse.json({
    ok: true,
    posts: ranked,
  });
}
