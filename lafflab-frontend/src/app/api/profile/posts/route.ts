import { NextResponse } from "next/server";
import { LaffLabApi } from "@/lib/LaffLabApi";

export async function GET(
  req: Request,
  { params }: { params: { username: string } }
) {
  try {
    const posts = await LaffLabApi.getProfilePosts(params.username);
    return NextResponse.json({ posts });
  } catch (err) {
    console.error("API /api/profile/posts error:", err);
    return NextResponse.json({ posts: [] }, { status: 500 });
  }
}
