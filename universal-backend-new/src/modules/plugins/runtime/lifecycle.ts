import { PluginRegistry } from "@/modules/plugins/runtime/registry.js";

export class PluginLifecycleManager {
  constructor(private registry: PluginRegistry) {}

  async init() {
    this.registry.logger.info?.("Plugin lifecycle init");
  }

  async shutdown() {
    this.registry.logger.info?.("Plugin lifecycle shutdown");
  }
}
