import { Hono } from "hono";
import { prisma } from "../lib/prisma";

const router = new Hono();

// GET /history/list
router.get("/list", async (c) => {
  try {
    const items = await prisma.history.findMany({
      orderBy: { viewedAt: "desc" },
    });
    return c.json(items);
  } catch (err) {
    console.error("History list error:", err);
    return c.json({ error: "Failed to load history" }, 500);
  }
});

// POST /history/add
router.post("/add", async (c) => {
  try {
    const body = await c.req.json();
    const { id } = body;

    if (!id) return c.json({ error: "Missing id" }, 400);

    const userId = "anonymous";

    const item = await prisma.history.create({
      data: {
        id,
        userId,
        viewedAt: BigInt(Date.now()),
      },
    });

    return c.json(item);
  } catch (err) {
    console.error("History add error:", err);
    return c.json({ error: "Failed to add history" }, 500);
  }
});

// POST /history/clear
router.post("/clear", async (c) => {
  try {
    const userId = "anonymous";

    await prisma.history.deleteMany({ where: { userId } });

    return c.json({ success: true });
  } catch (err) {
    console.error("History clear error:", err);
    return c.json({ error: "Failed to clear history" }, 500);
  }
});

export default router;
