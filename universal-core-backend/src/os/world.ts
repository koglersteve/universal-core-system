import { Hono } from "hono";

export const world = new Hono();

world.get("/", (c) =>
  c.json({
    message: "World OS online",
    canonical: true,
    model: "environment-state-action",
  })
);

world.get("/state", (c) =>
  c.json({
    environment: "default",
    conditions: {},
    timestamp: Date.now(),
  })
);

world.post("/act", async (c) => {
  const body = await c.req.json();
  return c.json({
    received: body,
    status: "ok",
    effect: "stubbed",
    timestamp: Date.now(),
  });
});
