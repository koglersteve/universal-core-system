import type { Hono } from "hono";

export function registerEmotionRoutes(app: Hono) {
  app.get("/emotion/state", (c) =>
    c.json({
      mood: "neutral",
      intensity: 0,
      updatedAt: Date.now()
    })
  );

  app.post("/emotion/update", async (c) => {
    const body = await c.req.json();
    return c.json({
      mood: body.mood || "neutral",
      intensity: body.intensity || 0,
      updatedAt: Date.now()
    });
  });
}
