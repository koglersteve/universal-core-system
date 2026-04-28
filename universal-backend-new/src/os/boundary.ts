import { Hono } from "hono";

export const boundary = new Hono();

boundary.get("/", (c) =>
  c.json({
    message: "Boundary OS online",
    canonical: true,
    model: "policy-based",
  })
);

boundary.get("/policies", (c) =>
  c.json({
    policies: [],
    mode: "stub",
    lastUpdated: null,
  })
);

boundary.post("/evaluate", async (c) => {
  const body = await c.req.json();
  return c.json({
    received: body,
    decision: "allow",
    reasons: [],
    status: "ok",
  });
});
