import { PluginRegistry } from "./registry";

export class PluginLifecycleManager {
  constructor(private registry: PluginRegistry) {}

  async shutdown() {
    const plugins = this.registry.list();
    for (const plugin of plugins) {
      await this.registry.unregister(plugin.id);
    }
  }
}
