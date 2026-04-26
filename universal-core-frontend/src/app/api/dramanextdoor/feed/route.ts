import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const cursor = searchParams.get("cursor") || undefined;
  const limit = Number(searchParams.get("limit") || 20);
  const userId = searchParams.get("userId") || "anon";

  const clips = await prisma.dramaClip.findMany({
    take: limit,
    skip: cursor ? 1 : 0,
    cursor: cursor ? { id: cursor } : undefined,
    orderBy: { createdAt: "desc" },
    include: {
      favorites: {
        where: { userId },
        select: { id: true }
      }
    }
  });

  const nextCursor =
    clips.length === limit ? clips[clips.length - 1].id : null;

  const items = clips.map((clip) => ({
    ...clip,
    userHasFavorited: clip.favorites.length > 0
  }));

  return NextResponse.json({ items, nextCursor });
}
