import { Hono } from "hono";

export const energy = new Hono();

energy.get("/", (c) =>
  c.json({
    message: "Energy OS online",
    canonical: true,
    model: "hybrid-global-multichannel",
  })
);

energy.get("/global", (c) =>
  c.json({
    level: 0.75,
    status: "stable",
    lastUpdated: null,
  })
);

energy.get("/channels", (c) =>
  c.json({
    cognitive: 0.6,
    emotional: 0.7,
    expressive: 0.8,
    memory: 0.5,
    system: 0.9,
    lastUpdated: null,
  })
);

energy.post("/adjust", async (c) => {
  const body = await c.req.json();
  return c.json({ received: body, status: "ok", adjusted: true });
});
