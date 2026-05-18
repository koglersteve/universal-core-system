import { Hono } from "hono";
import { prisma } from "../../shared/api/prisma";

const router = new Hono();

// GET /jokes
router.get("/", async (c) => {
  const jokes = await prisma.joke.findMany({
    orderBy: { createdAt: "desc" }
  });
  return c.json(jokes);
});

// POST /jokes
router.post("/", async (c) => {
  const body = await c.req.json();
  const { text, categoryId } = body;

  const joke = await prisma.joke.create({
    data: { text, categoryId }
  });

  return c.json(joke);
});

export default router;
