import { pluginRegistry } from "../plugins/runtime/registry";

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
        this.actions.push({
          pluginId: manifest.id,
          actionName,
          capability: def.capability,
          description: def.description,
          defaultArgs: def.defaultArgs,
          priority: def.priority ?? 1,
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
