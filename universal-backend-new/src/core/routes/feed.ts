import { Hono } from "hono";
import prisma from "../../shared/prisma";

const router = new Hono();

router.get("/", async (c) => {
  const feed = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: { creator: true },
    take: 100
  });

  return c.json(feed);
});

export default router;
