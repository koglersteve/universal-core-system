import type { Hono } from "hono";

export function registerMemoryRoutes(app: Hono) {
  app.get("/memory/recent", (c) =>
    c.json({
      items: [],
      updatedAt: Date.now()
    })
  );

  app.post("/memory/add", async (c) => {
    const body = await c.req.json();
    return c.json({
      added: body,
      updatedAt: Date.now()
    });
  });
}

