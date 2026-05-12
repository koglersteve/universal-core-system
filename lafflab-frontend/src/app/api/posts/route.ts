import { NextResponse } from "next/server";
import { getPostsByUser } from "@/lib/server/posts";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) return NextResponse.json([]);

  const posts = await getPostsByUser(userId);
  return NextResponse.json(posts);
}

