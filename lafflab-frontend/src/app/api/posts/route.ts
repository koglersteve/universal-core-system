import { NextResponse } from "next/server";
import { getPosts } from "@lib/server/jokes";
import { applyReactions } from "@core/reactions/engine";

export async function GET() {
  const posts = await getPosts();
  const enriched = applyReactions(posts);
  return NextResponse.json({ posts: enriched });
}
