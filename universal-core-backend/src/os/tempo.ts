import { Hono } from "hono";

export const tempo = new Hono();

tempo.get("/", (c) =>
  c.json({
    message: "Tempo OS online",
    canonical: true,
    model: "rhythm-flow-pacing",
  })
);

tempo.get("/state", (c) =>
  c.json({
    pace: "steady",
    urgency: "low",
    rhythm: "neutral",
    lastAdjusted: null,
  })
);

tempo.post("/adjust", async (c) => {
  const body = await c.req.json();
  return c.json({ received: body, status: "ok", adjusted: true });
});
