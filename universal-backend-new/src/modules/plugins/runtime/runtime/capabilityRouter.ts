import { Hono } from "hono";
import { PluginRegistry } from "@/modules/plugins/runtime/registry.js";

export function capabilityRouter(registry: PluginRegistry) {
  const router = new Hono();

  router.get("/", (c) => {
    const capabilities = registry.listCapabilities();
    return c.json({ capabilities });
  });

  return router;
}
