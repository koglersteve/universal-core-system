import type { Hono } from "hono";
import { Multiverse } from "./multiverse";

export function registerOSRoutes(app: Hono) {
  app.get("/os", (c) => {
    const universe = Multiverse.ensureDefault();
    return c.json({
      message: "Emotional OS online",
      timestamp: Date.now(),
      universe: {
        id: universe.id,
        label: universe.label,
        createdAt: universe.createdAt
      }
    });
  });

  app.get("/os/state", (c) => {
    const universe = Multiverse.ensureDefault();
    return c.json(universe.state);
  });
}
