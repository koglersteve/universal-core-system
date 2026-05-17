import { Hono } from "hono";

const router = new Hono();

router.post("/generate", async (c) => {
  const body = await c.req.json().catch(() => ({}));
  const { mood } = body || {};
  return c.json({
    mood: mood ?? null,
    ritual: null,
    message: "Daily ritual generation stubbed.",
  });
});

export default router;

