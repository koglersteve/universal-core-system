import { NextResponse } from "next/server";
import { getUser } from "@/lib/server/user";
import {
  followUser,
  unfollowUser,
  getFollowerCount,
  isFollowing,
} from "@/lib/server/follow";

export async function POST(req: Request) {
  const result = await getUser();
  const user = result?.user || null;

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const targetUserId = body.targetUserId as string;
  const action = body.action as "follow" | "unfollow";

  if (!targetUserId || (action !== "follow" && action !== "unfollow")) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (action === "follow") {
    await followUser(user.id, targetUserId);
  } else {
    await unfollowUser(user.id, targetUserId);
  }

  const followerCount = await getFollowerCount(targetUserId);
  const nowFollowing = await isFollowing(user.id, targetUserId);

  return NextResponse.json({
    followerCount,
    isFollowing: nowFollowing,
  });
}
