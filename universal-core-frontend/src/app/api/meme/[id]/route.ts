import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const meme = await prisma.meme.findUnique({
    where: { id: params.id }
  });

  if (!meme) {
    return new NextResponse("Not found", { status: 404 });
  }

  return NextResponse.json({
    id: meme.id,
    app: meme.app,
    mood: meme.mood,
    title: meme.title,
    layers: meme.layers,
    createdAt: meme.createdAt
  });
}
