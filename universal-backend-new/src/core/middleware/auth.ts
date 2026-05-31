import { prisma } from "@/shared/prisma/client.js";
import type { Context } from "hono";

export async function getCurrentUser(c: Context) {
  const token = c.req.header("authorization");
  if (!token) return null;

  const session = await prisma.session.findUnique({
    where: { token },
    include: { user: true },
  });

  if (!session) return null;
  if (session.expiresAt < new Date()) return null;

  return session.user;
}
