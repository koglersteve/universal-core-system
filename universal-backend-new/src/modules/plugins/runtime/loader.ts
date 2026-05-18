import { PluginRegistry } from "@/modules/plugins/runtime/registry.js";
import { PluginLifecycleManager } from "@/modules/plugins/runtime/lifecycle.js";

export class PluginLoader {
  constructor(
    private registry: PluginRegistry,
    private lifecycle: PluginLifecycleManager
  ) {}

  async loadFromDir(_dir: string) {
    // Stub: in future, load manifests from dir
    this.registry.logger.info?.("PluginLoader.loadFromDir called");
  }
}
