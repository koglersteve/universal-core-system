import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/server/user";

export async function GET() {
  try {
    const { user } = await getUser();

    if (!user) {
      return NextResponse.json({ user: null });
    }

    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        username: true,
        screenName: true,
        avatarUrl: true,
        email: true,
      },
    });

    return NextResponse.json({ user: dbUser });
  } catch {
    return NextResponse.json({ user: null });
  }
}
