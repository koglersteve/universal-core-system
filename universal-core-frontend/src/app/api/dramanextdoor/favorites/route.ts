import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const userId = searchParams.get("userId") || "anon";

  const favorites = await prisma.dramaFavorite.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: { clip: true }
  });

  return NextResponse.json({
    items: favorites.map((f) => f.clip)
  });
}
