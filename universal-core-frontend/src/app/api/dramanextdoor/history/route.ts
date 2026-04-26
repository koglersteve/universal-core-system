import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const userId = searchParams.get("userId") || "anon";

  const views = await prisma.dramaView.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: { clip: true }
  });

  return NextResponse.json({
    items: views.map((v) => v.clip)
  });
}
