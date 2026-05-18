import { Hono } from "hono";
import type { PluginRegistry } from "../runtime/registry";

export default function pluginRoutes(registry: PluginRegistry) {
  const router = new Hono();

  router.get("/", (c) => c.json(registry.listPlugins()));

  router.get("/:id", (c) => {
    const plugin = registry.getPlugin(c.req.param("id"));
    if (!plugin) return c.json({ error: "Not found" }, 404);
    return c.json(plugin);
  });

  return router;
}
