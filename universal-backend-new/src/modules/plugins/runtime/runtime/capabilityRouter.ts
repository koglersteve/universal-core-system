import { Hono } from "hono";
import type { PluginRegistry } from "../registry";

export function capabilityRouter(registry: PluginRegistry) {
  const router = new Hono();

  router.get("/", (c) => c.json(registry.listCapabilities()));

  router.post("/:name", async (c) => {
    const name = c.req.param("name");
    const capability = registry.getCapability(name);
    if (!capability) return c.json({ error: "Capability not found" }, 404);

    const body = await c.req.json().catch(() => ({}));
    const result = await capability(body);
    return c.json(result);
  });

  return router;
}
