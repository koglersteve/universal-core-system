import { Hono } from "hono";
import prisma from "../../shared/api/prisma";

const router = new Hono();

router.get("/", async (c) => {
  const jokes = await prisma.joke.findMany({
    orderBy: { createdAt: "desc" },
  });
  return c.json(jokes);
});

router.get("/random", async (c) => {
  const count = await prisma.joke.count();
  if (count === 0) {
    return c.json({ error: "No jokes available" }, 404);
  }

  const skip = Math.floor(Math.random() * count);
  const [joke] = await prisma.joke.findMany({
    take: 1,
    skip,
  });

  return c.json(joke);
});

export const jokesRoute = router;
export default router;
