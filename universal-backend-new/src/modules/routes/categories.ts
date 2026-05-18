import { Hono } from "hono";
import prisma from "../../shared/prisma";

const router = new Hono();

router.get("/", async (c) => {
  const categories = await prisma.joke.findMany({
    where: { categoryId: { not: null } },
    select: { categoryId: true },
    distinct: ["categoryId"]
  });

  return c.json(categories.map((c) => c.categoryId));
});

export default router;
