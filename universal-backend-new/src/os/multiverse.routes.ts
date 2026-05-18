import type { Hono } from "hono";
import { Multiverse } from "./multiverse";

export function registerMultiverseRoutes(app: Hono) {
  app.get("/multiverse/list", (c) => {
    const universes = Multiverse.list().map((u) => ({
      id: u.id,
      label: u.label,
      createdAt: u.createdAt
    }));
    return c.json({ universes });
  });

  app.post("/multiverse/create", async (c) => {
    const body = await c.req.json().catch(() => ({}));
    const label = body.label || "Unnamed Universe";
    const universe = Multiverse.create(label);
    return c.json({
      status: "ok",
      universe: {
        id: universe.id,
        label: universe.label,
        createdAt: universe.createdAt
      }
    });
  });

  app.get("/multiverse/:id/state", (c) => {
    const id = c.req.param("id");
    const universe = Multiverse.get(id);
    if (!universe) return c.json({ error: "Universe not found" }, 404);
    return c.json(universe.state);
  });
}
