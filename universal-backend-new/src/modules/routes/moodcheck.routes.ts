import { Hono } from "hono";

const router = new Hono();

router.get("/", (c) =>
  c.json({
    mood: "neutral",
    intensity: 0,
    updatedAt: Date.now()
  })
);

router.post("/", async (c) => {
  const body = await c.req.json();
  return c.json({
    mood: body.mood || "neutral",
    intensity: body.intensity || 0,
    updatedAt: Date.now()
  });
});

export default router;
