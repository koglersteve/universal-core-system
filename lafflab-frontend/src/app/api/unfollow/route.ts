import { NextResponse } from "next/server";
import { unfollowUser } from "@/lib/server/follow";

export async function POST(req: Request) {
  const { followerId, followingId } = await req.json();

  if (!followerId || !followingId) {
    return NextResponse.json(
      { error: "Missing followerId or followingId" },
      { status: 400 }
    );
  }

  await unfollowUser(followerId, followingId);

  return NextResponse.json({ success: true });
}
