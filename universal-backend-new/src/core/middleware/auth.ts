import { prisma } from "@/shared/prisma/client.js";

export async function getCurrentUser(c) {
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
