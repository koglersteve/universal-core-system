import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();
  const { clipId, userId = "anon" } = body;

  if (!clipId) {
    return NextResponse.json(
      { error: "clipId is required" },
      { status: 400 }
    );
  }

  // Check if already favorited
  const existing = await prisma.dramaFavorite.findFirst({
    where: { clipId, userId }
  });

  if (existing) {
    await prisma.dramaFavorite.delete({
      where: { id: existing.id }
    });

    return NextResponse.json({ favorited: false });
  }

  // Create new favorite
  await prisma.dramaFavorite.create({
    data: { clipId, userId }
  });

  return NextResponse.json({ favorited: true });
}
