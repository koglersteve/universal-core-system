import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();
  const { clipId, reaction } = body;

  const valid = [
    "laugh",
    "smile",
    "shock",
    "sad",
    "angry",
    "mindblown",
    "chaos"
  ];

  if (!valid.includes(reaction)) {
    return NextResponse.json(
      { error: "Invalid reaction" },
      { status: 400 }
    );
  }

  await prisma.dramaClip.update({
    where: { id: clipId },
    data: { [reaction]: { increment: 1 } }
  });

  return NextResponse.json({ ok: true });
}
