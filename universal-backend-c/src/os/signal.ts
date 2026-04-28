import { Hono } from "hono";

export const signal = new Hono();

signal.get("/", (c) =>
  c.json({
    message: "Signal OS online",
    canonical: true,
    model: "hybrid",
    autoMirror: true,
  })
);

signal.get("/state", (c) =>
  c.json({
    mood: "neutral",
    tone: "soft",
    intensity: 0,
    channel: "default",
    lastBroadcast: null,
  })
);

signal.post("/update", async (c) => {
  const body = await c.req.json();
  return c.json({ received: body, status: "ok", override: true });
});
