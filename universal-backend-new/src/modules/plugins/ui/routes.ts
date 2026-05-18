import { PluginRegistry } from "@/modules/plugins/runtime/registry.js";

export default function pluginUiRoutes(app: any, _registry: PluginRegistry) {
  app.get("/plugins/ui", (c: any) => {
    return c.json({
      message: "Plugin UI API online"
    });
  });
}
