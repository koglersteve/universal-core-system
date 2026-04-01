import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_req: NextRequest) {
  const byApp = await prisma.memeEvent.groupBy({
    by: ["app"],
    _count: { _all: true }
  });

  const byMood = await prisma.memeEvent.groupBy({
    by: ["mood"],
    _count: { _all: true }
  });

  return NextResponse.json({
    byApp,
    byMood
  });
}
