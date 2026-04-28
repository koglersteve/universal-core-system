import { Hono } from "hono";

export const attention = new Hono();

attention.get("/", (c) =>
  c.json({
    message: "Attention OS online",
    canonical: true,
    model: "spotlight-priority-salience",
  })
);

attention.get("/focus", (c) =>
  c.json({
    target: "none",
    priority: "low",
    salience: 0,
    lastUpdated: null,
  })
);

attention.post("/focus", async (c) => {
  const body = await c.req.json();
  return c.json({ received: body, status: "ok", focused: true });
});

attention.get("/salience", (c) =>
  c.json({
    items: [],
    mode: "stub",
    lastComputed: null,
  })
);
