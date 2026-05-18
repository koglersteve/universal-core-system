import { Hono } from "hono";
import prisma from "../../shared/prisma";

const router = new Hono();

router.get("/:userId", async (c) => {
  const userId = c.req.param("userId");

  const settings = await prisma.userSettings.findUnique({
    where: { userId }
  });

  return c.json(settings ?? {});
});

router.patch("/:userId", async (c) => {
  const userId = c.req.param("userId");
  const data = await c.req.json();

  const updated = await prisma.userSettings.upsert({
    where: { userId },
    update: data,
    create: { userId, ...data }
  });

  return c.json(updated);
});

export default router;
