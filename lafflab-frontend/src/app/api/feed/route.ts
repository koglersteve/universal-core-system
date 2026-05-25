import { NextResponse } from "next/server";
import { LaffLabApi } from "@/lib/LaffLabApi";

export async function GET() {
  try {
    const posts = await LaffLabApi.fetchFeed();
    return NextResponse.json({ posts });
  } catch (err) {
    console.error("API /api/feed error:", err);
    return NextResponse.json({ posts: [] }, { status: 500 });
  }
}
