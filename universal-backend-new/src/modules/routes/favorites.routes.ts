import { Hono } from "hono";
import prisma from "../../shared/prisma";

const router = new Hono();

router.get("/:userId", async (c) => {
  const userId = c.req.param("userId");

  const favorites = await prisma.favorite.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" }
  });

  return c.json(favorites);
});

router.post("/", async (c) => {
  const body = await c.req.json();
  const { userId, itemId } = body;

  const fav = await prisma.favorite.create({
    data: { userId, itemId }
  });

  return c.json(fav);
});

router.delete("/:id", async (c) => {
  const id = c.req.param("id");

  await prisma.favorite.delete({ where: { id } });

  return c.json({ success: true });
});

export default router;
