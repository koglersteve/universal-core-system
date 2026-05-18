import fs from "fs";
import path from "path";
import { PluginRegistry } from "./registry";
import { PluginManifest } from "./types";

export class PluginLoader {
  constructor(private registry: PluginRegistry) {}

  async loadFromDir(dir: string) {
    const files = fs.readdirSync(dir).filter(f => f.endsWith(".plugin.ts") || f.endsWith(".plugin.js"));

    for (const file of files) {
      const fullPath = path.join(dir, file);
      const mod = await import(fullPath);
      const manifest: PluginManifest = mod.default ?? Object.values(mod)[0];

      await this.registry.register(manifest);
    }
  }
}
