import { Hono } from "hono";
import prisma from "../../shared/api/prisma";

const router = new Hono();

router.post("/toggle", async (c) => {
  const body = await c.req.json();
  const { id, userId } = body;

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

  const created = await prisma.favorite.create({
    data: {
      id,
      itemId: id,
      userId: userId || "anonymous",
    },
  });

  return c.json({ favorited: true, favorite: created });
});

export const favoritesRoute = router;
export default router;
