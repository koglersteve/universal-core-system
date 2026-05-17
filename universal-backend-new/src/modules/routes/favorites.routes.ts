import { Hono } from "hono";
import prisma from "../../shared/api/prisma";

const router = new Hono();

router.post("/toggle", async (c) => {
  const body = await c.req.json();
  const { id } = body;

  if (!id) {
    return c.json({ error: "id is required" }, 400);
  }

  const existing = await prisma.favorite.findUnique({
    where: { id },
  });

  if (existing) {
    await prisma.favorite.delete({ where: { id } });
    return c.json({ favorited: false });
  }

  await prisma.favorite.create({
    data: { id, userId: "default", itemId: id },
  });

  return c.json({ favorited: true });
});

export default router;
