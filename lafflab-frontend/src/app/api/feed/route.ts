export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/server/user";

const PAGE_SIZE = 20;

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const pageParam = url.searchParams.get("page");
  const page = Number.isNaN(Number(pageParam)) ? 0 : parseInt(pageParam || "0", 10);
  const skip = page * PAGE_SIZE;

  let user = null;

  try {
    const result = await getUser();
    user = result?.user || null;
  } catch {
    user = null;
  }

  let where: any = undefined;

  if (user) {
    try {
      const following = await prisma.follow.findMany({
        where: { followerId: user.id },
        select: { followingId: true },
      });

      const followingIds = following.map((f) => f.followingId);

      where = {
        OR: [
          { userId: user.id },
          { userId: { in: followingIds } },
        ],
      };
    } catch {
      where = undefined;
    }
  }

  const posts = await prisma.post.findMany({
    where,
    orderBy: { createdAt: "desc" },
    skip,
    take: PAGE_SIZE,
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

  const hasMore = posts.length === PAGE_SIZE;

  return NextResponse.json({ posts, hasMore });
}
