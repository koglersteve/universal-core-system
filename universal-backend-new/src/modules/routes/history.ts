import { Hono } from "hono";
import prisma from "../../shared/api/prisma";

const router = new Hono();

router.get("/list", async (c) => {
  const history = await prisma.history.findMany({
    orderBy: { viewedAt: "desc" },
  });
  return c.json(history);
});

router.post("/add", async (c) => {
  const body = await c.req.json();
  const { jokeId, userId } = body;

  if (!jokeId) {
    return c.json({ error: "jokeId is required" }, 400);
  }

  const record = await prisma.history.create({
    data: {
      jokeId,
      userId: userId || "anonymous",
    },
  });

  return c.json(record);
});

export const historyRoute = router;
export default router;
