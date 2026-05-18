import { Hono } from "hono";
import { prisma } from "../../shared/api/prisma";

const router = new Hono();

// GET /profile/:id
router.get("/:id", async (c) => {
  const id = c.req.param("id");

  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      posts: true,
      lafflabItems: true,
      favorites: true,
      dramaFavorites: true,
      dramaViews: true,
      settings: true
    }
  });

  if (!user) return c.json({ error: "User not found" }, 404);
  return c.json(user);
});

// PATCH /profile/:id
router.patch("/:id", async (c) => {
  const id = c.req.param("id");
  const data = await c.req.json();

  const updated = await prisma.user.update({
    where: { id },
    data
  });

  return c.json(updated);
});

export default router;
