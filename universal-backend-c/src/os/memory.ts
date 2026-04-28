import { Hono } from "hono";

export const memory = new Hono();

memory.get("/", (c) =>
  c.json({
    message: "Memory OS online",
    canonical: true,
    model: "hybrid",
  })
);

memory.get("/short-term", (c) =>
  c.json({
    items: [],
    capacityHint: "small",
    lastUpdated: null,
  })
);

memory.get("/long-term", (c) =>
  c.json({
    items: [],
    capacityHint: "large",
    lastConsolidated: null,
  })
);

memory.post("/append", async (c) => {
  const body = await c.req.json();
  return c.json({ received: body, status: "ok", appended: true });
});
