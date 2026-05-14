export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/server/user";

export async function GET() {
  let user = null;

  // SAFE getUser() — never hangs
  try {
    const result = await getUser();
    user = result?.user || null;
  } catch (e) {
    user = null;
  }

  // If no user → return global feed
  if (!user) {
    const posts = await prisma.post.findMany({
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

  // If user exists → return personalized feed
  const following = await prisma.follow.findMany({
    where: { followerId: user.id },
    select: { followingId: true },
  });

  const followingIds = following.map((f) => f.followingId);

  const posts = await prisma.post.findMany({
    where: {
      OR: [
        { userId: user.id },
        { userId: { in: followingIds } },
      ],
    },
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
