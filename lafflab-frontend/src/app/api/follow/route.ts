import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/server/user";

export async function POST(req: Request) {
  const { user } = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { targetId } = await req.json();
  if (!targetId) return NextResponse.json({ error: "Missing targetId" }, { status: 400 });

  if (targetId === user.id) {
    return NextResponse.json({ error: "Cannot follow yourself" }, { status: 400 });
  }

  await prisma.follow.upsert({
    where: {
      followerId_followingId: {
        followerId: user.id,
        followingId: targetId,
      },
    },
    update: {},
    create: {
      followerId: user.id,
      followingId: targetId,
    },
  });

  return NextResponse.json({ success: true });
}
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/server/user";

export async function POST(req: Request) {
  const { user } = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { targetId } = await req.json();
  if (!targetId) return NextResponse.json({ error: "Missing targetId" }, { status: 400 });

  await prisma.follow.upsert({
    where: {
      followerId_followingId: {
        followerId: user.id,
        followingId: targetId,
      },
    },
    update: {},
    create: {
      followerId: user.id,
      followingId: targetId,
    },
  });

  return NextResponse.json({ success: true });
}
