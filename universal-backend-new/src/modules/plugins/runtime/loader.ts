import fs from "fs";
import path from "path";
import { PluginRegistry } from "./registry";
import { PluginManifest } from "./types";

export class PluginLoader {
  constructor(private registry: PluginRegistry) {}

  async loadFromDir(dir: string) {
    const files = fs
      .readdirSync(dir)
      .filter(f => f.endsWith(".plugin.ts") || f.endsWith(".plugin.js"));

    for (const file of files) {
      const fullPath = path.join(dir, file);

      // Dynamic import of plugin module
      const mod = await import(fullPath);

      // Plugin manifest is default export OR first named export
      const manifest: PluginManifest = mod.default ?? Object.values(mod)[0];

      if (!manifest || !manifest.id) {
        console.error(`Invalid plugin manifest in ${file}`);
        continue;
      }

      // Use legacy-compatible register() method
      this.registry.register(manifest.id, manifest);
    }
  }
}
