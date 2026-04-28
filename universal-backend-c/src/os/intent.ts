import { Hono } from "hono";

export const intent = new Hono();

intent.get("/", (c) =>
  c.json({
    message: "Intent OS online",
    canonical: true,
    model: "hybrid-declarative-inferred",
  })
);

intent.post("/set", async (c) => {
  const body = await c.req.json();
  return c.json({ received: body, status: "ok", declarative: true });
});

intent.get("/infer", (c) =>
  c.json({
    goal: "maintain_stability",
    confidence: 0.42,
    sources: ["emotion", "signal", "state", "identity", "persona", "memory"],
    timestamp: Date.now(),
  })
);

intent.get("/active", (c) =>
  c.json({
    goal: "maintain_stability",
    priority: "medium",
    origin: "merged",
    timestamp: Date.now(),
  })
);
