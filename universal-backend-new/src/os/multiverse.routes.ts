import type { Hono } from "hono";
import { Multiverse } from "./multiverse";

const universes: any[] = [
  {
    id: "default",
    createdAt: Date.now(),
    parent: null,
    state: {}
  }
];

export function registerMultiverseRoutes(app: Hono) {
  app.get("/multiverse/list", (c) => c.json({ universes }));

  app.post("/multiverse/create", (c) => {
    const u = Multiverse.create();
    universes.push(u);
    return c.json({ status: "ok", universe: u });
  });
}
