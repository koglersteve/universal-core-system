import { pluginRegistry } from "./registry";
import { eventBus } from "../../../os/eventbus/bus";

export async function initializePlugins() {
  for (const plugin of pluginRegistry.list()) {
    const manifest = plugin.manifest;

    if (manifest.init) {
      await manifest.init();
    }

    if (manifest.events) {
      for (const [eventName, handler] of Object.entries(manifest.events)) {
        eventBus.on(eventName, handler);
      }
    }

    plugin.active = true;
  }

  console.log("[PluginRuntime] All plugins initialized");
}
