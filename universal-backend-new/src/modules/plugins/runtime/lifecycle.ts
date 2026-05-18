import { PluginRegistry } from "./registry";

export class PluginLifecycleManager {
  constructor(private registry: PluginRegistry) {}

  async shutdown() {
    const plugins = this.registry.list(); // legacy-compatible list()

    for (const plugin of plugins) {
      if (plugin?.id) {
        await this.registry.unregister(plugin.id); // legacy-compatible unregister()
      }
    }
  }
}
