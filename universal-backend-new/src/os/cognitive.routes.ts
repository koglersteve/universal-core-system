import type { Hono } from "hono";

export function registerCognitiveRoutes(app: Hono) {
  app.get("/cognitive/state", (c) =>
    c.json({
      clarity: 1.0,
      load: 0.2,
      updatedAt: Date.now()
    })
  );

  app.post("/cognitive/update", async (c) => {
    const body = await c.req.json();
    return c.json({
      clarity: body.clarity ?? 1.0,
      load: body.load ?? 0.2,
      updatedAt: Date.now()
    });
  });
}
