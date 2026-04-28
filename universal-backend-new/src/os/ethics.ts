import { Hono } from "hono";

export const ethics = new Hono();

ethics.get("/", (c) =>
  c.json({
    message: "Ethics OS online",
    canonical: true,
    model: "principle-constraint-hybrid",
  })
);

ethics.get("/principles", (c) =>
  c.json({
    principles: [],
    mode: "stub",
    lastUpdated: null,
  })
);

ethics.post("/evaluate", async (c) => {
  const body = await c.req.json();
  return c.json({
    received: body,
    ethicalDecision: "allow",
    confidence: 0.5,
    reasons: [],
    status: "ok",
  });
});

ethics.get("/alignment", (c) =>
  c.json({
    aligned: true,
    confidence: 0.5,
    lastChecked: null,
  })
);
