import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body?.username) {
    return NextResponse.json(
      { error: "Missing username" },
      { status: 400 }
    );
  }

  const user = await prisma.user.create({
    data: {
      username: body.username,
      avatarUrl: body.avatarUrl || "",
      bio: body.bio || "",
    },
  });

  return NextResponse.json(user);
}
