import { NextResponse } from "next/server";
import { getPosts, getPostsByUser } from "@/lib/server/posts";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (userId) {
    const posts = await getPostsByUser(userId);
    return NextResponse.json(posts);
  }

  const posts = await getPosts();
  return NextResponse.json(posts);
}

