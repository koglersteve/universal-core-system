import { pluginRegistry } from "./registry";
import { eventBus } from "../../../os/eventbus/bus";
import type { PluginCapabilityContext } from "./types";

class PluginCapabilityRouter {
  async call(
    pluginId: string,
    capability: string,
    args: any = {}
  ): Promise<any> {
    const plugin = pluginRegistry.get(pluginId);
    if (!plugin) {
      throw new Error(`Plugin not found: ${pluginId}`);
    }

    const capabilities = plugin.manifest.capabilities ?? {};
    const handler = capabilities[capability];

    if (!handler) {
      console.warn(
        `[PluginCapabilityRouter] Capability not declared: ${pluginId}.${capability}`
      );
      throw new Error(`Capability not available: ${pluginId}.${capability}`);
    }

    const context: PluginCapabilityContext = {
      pluginId,
      capability,
    };

    await eventBus.emit("plugin:capability_called", {
      pluginId,
      capability,
      args,
    });

    try {
      const result = await handler(args, context);

      await eventBus.emit("plugin:capability_succeeded", {
        pluginId,
        capability,
        args,
        result,
      });

      return result;
    } catch (error) {
      console.error(
        `[PluginCapabilityRouter] Error in ${pluginId}.${capability}:`,
        error
      );

      await eventBus.emit("plugin:capability_error", {
        pluginId,
        capability,
        args,
        error: (error as Error).message ?? String(error),
      });

      throw error;
    }
  }

  listCapabilities(pluginId: string): string[] {
    const plugin = pluginRegistry.get(pluginId);
    if (!plugin) return [];
    return Object.keys(plugin.manifest.capabilities ?? {});
  }
}

export const pluginCapabilityRouter = new PluginCapabilityRouter();
