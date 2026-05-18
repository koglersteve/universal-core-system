import type { Hono } from "hono";

export function registerPersonaRoutes(app: Hono) {
  app.get("/persona/list", (c) =>
    c.json({
      persona: "neutral-guide",
      updatedAt: Date.now()
    })
  );

  app.post("/persona/update", async (c) => {
    const body = await c.req.json();
    return c.json({
      persona: body.persona || "neutral-guide",
      updatedAt: Date.now()
    });
  });
}
