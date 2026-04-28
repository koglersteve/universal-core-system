import { Hono } from "hono";

export function registerIDLYILYRoutes(app: Hono) {
  app.post("/api/idlyily/generate", async (c) => {
    const body = await c.req.json();
    const { prompt } = body;

    return c.json({
      status: "ok",
      prompt,
      message: `I deeply love you, I love you — ${prompt}`
    });
  });
}
