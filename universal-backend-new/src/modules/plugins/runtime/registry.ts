import type { PluginManifest } from "./types";

const registry = new Map<string, PluginManifest>();

export const pluginRegistry = {
  register(manifest: PluginManifest) {
    registry.set(manifest.id, manifest);
  },

  get(id: string) {
    return registry.get(id) || null;
  },

  list(): PluginManifest[] {
    return Array.from(registry.values());
  }
};
