import { pluginRegistry } from "./registry";

export function initializePlugins() {
  const plugins = pluginRegistry.list();

  for (const plugin of plugins) {
    if (!plugin.enabled) continue;
  }
}
