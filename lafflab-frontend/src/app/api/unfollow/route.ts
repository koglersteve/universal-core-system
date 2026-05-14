import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/server/user";

export async function POST(req: Request) {
  const { user } = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { targetId } = await req.json();
  if (!targetId) return NextResponse.json({ error: "Missing targetId" }, { status: 400 });

  await prisma.follow.deleteMany({
    where: {
      followerId: user.id,
      followingId: targetId,
    },
  });

  return NextResponse.json({ success: true });
}

