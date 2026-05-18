import type { Hono } from "hono";

export function registerBehaviorRoutes(app: Hono) {
  app.get("/behavior/state", (c) =>
    c.json({
      behavior: "neutral",
      updatedAt: Date.now()
    })
  );

  app.post("/behavior/update", async (c) => {
    const body = await c.req.json();
    return c.json({
      behavior: body.behavior || "neutral",
      updatedAt: Date.now()
    });
  });
}
