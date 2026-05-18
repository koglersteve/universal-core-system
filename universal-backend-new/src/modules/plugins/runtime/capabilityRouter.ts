import { pluginRegistry } from "./registry";

export const pluginCapabilityRouter = {
  hasCapability(pluginId: string, capability: string): boolean {
    const plugin = pluginRegistry.get(pluginId);
    if (!plugin) return false;
    return plugin.capabilities.includes(capability);
  },

  listCapabilities(pluginId: string): string[] {
    const plugin = pluginRegistry.get(pluginId);
    return plugin ? plugin.capabilities : [];
  }
};
