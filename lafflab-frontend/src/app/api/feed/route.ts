export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/server/user";

export async function GET() {
  const { user } = await getUser();

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
