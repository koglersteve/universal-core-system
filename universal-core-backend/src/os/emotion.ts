import { Hono } from "hono";

export const emotion = new Hono();

emotion.get("/", (c) =>
  c.json({
    message: "Emotional OS online",
    canonical: true,
    model: "hybrid",
  })
);

emotion.get("/state", (c) =>
  c.json({
    mood: "neutral",
    intensity: 0,
    lastUpdated: null,
  })
);

emotion.post("/update", async (c) => {
  const body = await c.req.json();
  return c.json({ received: body, status: "ok", canonical: true });
});
