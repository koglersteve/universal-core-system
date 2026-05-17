import { LoadedPlugin, PluginManifest } from "./types";

class PluginRegistry {
  private plugins: Map<string, LoadedPlugin> = new Map();

  register(manifest: PluginManifest) {
    if (this.plugins.has(manifest.id)) {
      throw new Error(`Plugin already registered: ${manifest.id}`);
    }

    this.plugins.set(manifest.id, {
      manifest,
      active: false,
      loadedAt: Date.now(),
    });
  }

  list() {
    return Array.from(this.plugins.values());
  }

  get(id: string) {
    return this.plugins.get(id);
  }

  activate(id: string) {
    const plugin = this.plugins.get(id);
    if (!plugin) throw new Error(`Plugin not found: ${id}`);
    plugin.active = true;
  }
}

export const pluginRegistry = new PluginRegistry();
