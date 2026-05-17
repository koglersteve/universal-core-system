import type { Hono } from "hono";
import { pluginRegistry } from "../runtime/registry";

export function registerPluginUIRoutes(app: Hono) {
  app.get("/plugins/ui", (c) => {
    const plugins = pluginRegistry.list();

    const ui = plugins
      .filter((p) => p.manifest.ui)
      .map((p) => ({
        pluginId: p.manifest.id,
        name: p.manifest.name,
        ui: p.manifest.ui,
      }));

    return c.json({ plugins: ui });
  });
}
