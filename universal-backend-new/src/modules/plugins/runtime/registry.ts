import { PluginManifest, LoadedPlugin, PluginContext } from "./types";

export class PluginRegistry {
  private plugins = new Map<string, LoadedPlugin>();

  constructor(private ctx: PluginContext) {}

  async register(manifest: PluginManifest) {
    if (this.plugins.has(manifest.id)) {
      throw new Error(`Plugin '${manifest.id}' already registered`);
    }

    const instance = manifest.runtime ?? {};
    const loaded: LoadedPlugin = { manifest, instance };

    if (instance.onLoad) {
      await instance.onLoad(this.ctx);
    }

    this.plugins.set(manifest.id, loaded);
    this.ctx.logger.info(`Plugin registered: ${manifest.id}`);
  }

  async unregister(id: string) {
    const plugin = this.plugins.get(id);
    if (!plugin) return;

    if (plugin.instance.onUnload) {
      await plugin.instance.onUnload(this.ctx);
    }

    this.plugins.delete(id);
    this.ctx.logger.info(`Plugin unregistered: ${id}`);
  }

  get(id: string) {
    return this.plugins.get(id)?.manifest;
  }

  list() {
    return [...this.plugins.values()].map((p) => p.manifest);
  }
}
