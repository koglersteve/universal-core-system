import { Hono } from "hono";
import prisma from "../../shared/api/prisma";

const USER_ID = "demo-user-123";

const router = new Hono();

router.get("/", async (c) => {
  let settings = await prisma.userSettings.findUnique({
    where: { userId: USER_ID },
  });

  if (!settings) {
    settings = await prisma.userSettings.create({
      data: { userId: USER_ID },
    });
  }

  return c.json(settings);
});

router.patch("/", async (c) => {
  const body = await c.req.json();

  const updated = await prisma.userSettings.update({
    where: { userId: USER_ID },
    data: body,
  });

  return c.json(updated);
});

export default router;
