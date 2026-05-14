import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/server/user";
import { z } from "zod";

const ProfileSchema = z.object({
  username: z.string().min(3).max(32).optional(),
  screenName: z.string().min(1).max(64).optional(),
  avatarUrl: z.string().url().optional().or(z.literal("")),
  bio: z.string().max(280).optional(),
});

export async function PATCH(req: Request) {
  const { user } = await getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = ProfileSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const data = parsed.data;

  const updated = await prisma.user.update({
    where: { id: user.id },
    data,
  });

  return NextResponse.json(updated);
}
