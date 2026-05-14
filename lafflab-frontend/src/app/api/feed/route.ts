export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/server/user";

export async function GET() {
  let user = null;

  // Fully safe getUser()
  try {
    const result = await getUser();
    user = result?.user || null;
  } catch (e) {
    user = null;
  }

  // Try follow table safely
  let followingIds: string[] = [];

  if (user) {
    try {
      const following = await prisma.follow.findMany({
        where: { followerId: user.id },
        select: { followingId: true },
      });

      followingIds = following.map((f) => f.followingId);
    } catch (e) {
      // Follow table missing → fallback to global feed
      followingIds = [];
    }
  }

  // Fetch posts (global or personalized)
  const posts = await prisma.post.findMany({
    where: user
      ? {
          OR: [
            { userId: user.id },
            { userId: { in: followingIds } },
          ],
        }
      : undefined,
    orderBy: { createdAt: "desc" },
    take: 50,
    include: {
      user: {
        select: {
          id: true,
          username: true,
          screenName: true,
          avatarUrl: true,
        },
      },
    },
  });

  return NextResponse.json({ posts });
}
