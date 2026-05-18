import { Hono } from "hono";
import { prisma } from "../../shared/api/prisma";

const router = new Hono();

// GET /favorites/:userId
router.get("/:userId", async (c) => {
  const userId = c.req.param("userId");

  const favorites = await prisma.favorite.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" }
  });

  return c.json(favorites);
});

// POST /favorites
router.post("/", async (c) => {
  const body = await c.req.json();
  const { userId, itemId } = body;

  const fav = await prisma.favorite.create({
    data: { userId, itemId }
  });

  return c.json(fav);
});

// DELETE /favorites/:id
router.delete("/:id", async (c) => {
  const id = c.req.param("id");

  await prisma.favorite.delete({ where: { id } });

  return c.json({ success: true });
});

export default router;
