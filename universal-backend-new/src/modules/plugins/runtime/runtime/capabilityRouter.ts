import { Hono } from "hono";
import type { PluginRegistry } from "./registry";

export function capabilityRouter(registry: PluginRegistry) {
  const router = new Hono();

  router.get("/", (c) => c.json(registry.listCapabilities()));

  return router;
}
