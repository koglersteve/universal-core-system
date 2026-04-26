import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();
  const { type, url, thumbnail, duration } = body;

  const valid = ["video", "audio", "image", "meme"];
  if (!valid.includes(type)) {
    return NextResponse.json(
      { error: "Invalid type" },
      { status: 400 }
    );
  }

  const clip = await prisma.dramaClip.create({
    data: {
      type,
      url,
      thumbnail,
      duration
    }
  });

  return NextResponse.json({ clip });
}
