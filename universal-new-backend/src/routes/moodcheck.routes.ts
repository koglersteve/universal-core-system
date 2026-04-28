import { Hono } from "hono";

export function registerMoodCheckRoutes(app: Hono) {
  app.post("/plugins/moodcheck/api/submit", async (c) => {
    const body = await c.req.json();

    // For now, just echo back what we received
    return c.json({
      ok: true,
      received: body,
      timestamp: Date.now(),
    });
  });
}
