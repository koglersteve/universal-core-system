// src/os/autonomy/pluginActions.ts
import { pluginRegistry } from "../../modules/plugins/runtime/registry";

export interface PluginAutonomyAction {
  pluginId: string;
  actionName: string;
  capability: string;
  description?: string;
  defaultArgs?: any;
  priority: number;
}

class PluginAutonomyActionRegistry {
  private actions: PluginAutonomyAction[] = [];

  loadFromPlugins() {
    this.actions = [];

    for (const plugin of pluginRegistry.list()) {
      const manifest = plugin.manifest;
      const defs = manifest.autonomyActions ?? {};

      for (const [actionName, def] of Object.entries(defs)) {
        const typedDef = def as any;
        this.actions.push({
          pluginId: manifest.id,
          actionName,
          capability: typedDef.capability,
          description: typedDef.description,
          defaultArgs: typedDef.defaultArgs,
          priority: typedDef.priority ?? 1,
        });
      }
    }

    console.log(
      `[AutonomyPluginActions] Loaded ${this.actions.length} plugin autonomy actions`
    );
  }

  list() {
    return this.actions;
  }

  get(actionName: string) {
    return this.actions.find((a) => a.actionName === actionName);
  }
}

export const pluginAutonomyActions = new PluginAutonomyActionRegistry();
