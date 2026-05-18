import { Hono } from "hono";
import prisma from "../../shared/prisma";

const router = new Hono();

router.get("/", async (c) => {
  const items = await prisma.lAFFItem.findMany({
    orderBy: { createdAt: "desc" },
    include: { creator: true }
  });
  return c.json(items);
});

router.post("/", async (c) => {
  const body = await c.req.json();
  const { creatorId, type, text, mediaUrl, caption, app } = body;

  const item = await prisma.lAFFItem.create({
    data: { creatorId, type, text, mediaUrl, caption, app }
  });

  return c.json(item);
});

export default router;
