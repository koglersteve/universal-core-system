import { PluginRegistry } from "@/modules/plugins/runtime/registry.js";

export default function pluginRoutes(app: any, registry: PluginRegistry) {
  app.get("/plugins", (c: any) => {
    const plugins = registry.listPlugins();
    return c.json({ plugins });
  });
}
