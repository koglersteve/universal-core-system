import { Hono } from "hono";

export const identity = new Hono();

identity.get("/", (c) =>
  c.json({
    message: "Identity OS online",
    canonical: true,
    model: "persistent",
  })
);

identity.get("/profile", (c) =>
  c.json({
    id: "anonymous",
    displayName: "Guest",
    roles: [],
    traits: { mode: "observer" },
    lastUpdated: null,
  })
);

identity.post("/update", async (c) => {
  const body = await c.req.json();
  return c.json({ received: body, status: "ok" });
});
