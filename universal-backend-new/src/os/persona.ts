import { Hono } from "hono";

export const persona = new Hono();

persona.get("/", (c) =>
  c.json({
    message: "Persona OS online",
    canonical: true,
    model: "dynamic-context-adaptive",
  })
);

persona.get("/current", (c) =>
  c.json({
    persona: "neutral-guide",
    reason: "Default persona for neutral emotional + signal state",
    adaptive: true,
    lastComputed: Date.now(),
  })
);

persona.post("/override", async (c) => {
  const body = await c.req.json();
  return c.json({ received: body, status: "ok", override: true });
});
