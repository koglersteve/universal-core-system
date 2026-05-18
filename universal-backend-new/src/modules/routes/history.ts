import { Hono } from "hono";
import prisma from "../../shared/prisma";

const router = new Hono();

router.get("/:userId", async (c) => {
  const userId = c.req.param("userId");

  const history = await prisma.history.findMany({
    where: { userId },
    orderBy: { viewedAt: "desc" },
    include: { user: true }
  });

  return c.json(history);
});

router.post("/", async (c) => {
  const body = await c.req.json();
  const { userId, jokeId } = body;

  const entry = await prisma.history.create({
    data: { userId, jokeId }
  });

  return c.json(entry);
});

export default router;
