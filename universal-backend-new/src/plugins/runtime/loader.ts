import { pluginRegistry } from "./registry";
import { PluginManifest } from "./types";

// Import plugin manifests here
import examplePlugin from "../manifests/example.plugin";

export function loadAllPlugins() {
  const manifests: PluginManifest[] = [examplePlugin];

  for (const manifest of manifests) {
    pluginRegistry.register(manifest);
  }

  console.log(`[PluginRuntime] Loaded ${manifests.length} plugin manifests`);
}
