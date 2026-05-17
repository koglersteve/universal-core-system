import type { Hono } from "hono";
import { pluginRegistry } from "../runtime/registry";
import { pluginCapabilityRouter } from "../runtime/capabilityRouter";

export function registerPluginRoutes(app: Hono) {
  app.get("/plugins/list", (c) => {
    return c.json(pluginRegistry.list());
  });

  app.get("/plugins/:id", (c) => {
    const id = c.req.param("id");
    const plugin = pluginRegistry.get(id);
    if (!plugin) return c.json({ error: "Plugin not found" }, 404);
    return c.json(plugin);
  });

  app.get("/plugins/:id/capabilities", (c) => {
    const id = c.req.param("id");
    const caps = pluginCapabilityRouter.listCapabilities(id);
    return c.json({ pluginId: id, capabilities: caps });
  });

  app.post("/plugins/:id/call/:capability", async (c) => {
    const id = c.req.param("id");
    const capability = c.req.param("capability");
    const body = await c.req.json().catch(() => ({}));

    try {
      const result = await pluginCapabilityRouter.call(id, capability, body);
      return c.json({ result });
    } catch (error) {
      return c.json(
        {
          error: (error as Error).message ?? String(error),
        },
        500
      );
    }
  });
}
