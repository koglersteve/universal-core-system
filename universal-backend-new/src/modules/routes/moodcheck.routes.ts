import { Hono } from "hono";

const router = new Hono();

// POST /moodcheck
router.post("/", async (c) => {
  const body = await c.req.json();
  return c.json({
    received: true,
    mood: body.mood ?? "unknown"
  });
});

export default router;
