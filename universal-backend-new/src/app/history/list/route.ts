import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const items = await prisma.history.findMany({
      orderBy: { viewedAt: "desc" },
    });

    return NextResponse.json(items);
  } catch (err) {
    console.error("Error loading history:", err);
    return NextResponse.json([], { status: 500 });
  }
}
