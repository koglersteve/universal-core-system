export interface PluginCapabilityContext {
  pluginId: string;
  capability: string;
}

export type PluginCapabilityHandler = (
  args: any,
  context: PluginCapabilityContext
) => Promise<any> | any;

// ────────────────────────────────────────────────
// UI TYPES
// ────────────────────────────────────────────────

export type PluginUILocation =
  | "dashboard"
  | "sidebar"
  | "modal"
  | "settings";

export interface PluginUIPanel {
  id: string;
  title: string;
  location: PluginUILocation;
  component: string;
  props?: Record<string, any>;
}

export interface PluginUIManifest {
  panels?: PluginUIPanel[];
  widgets?: PluginUIPanel[];
  settingsPages?: PluginUIPanel[];
  notifications?: PluginUIPanel[];
}

// ────────────────────────────────────────────────
// AGENT TYPES (PLUGIN-DEFINED AGENTS)
// ────────────────────────────────────────────────

export type AgentRole = "planner" | "observer" | "executor" | "critic" | "custom";

export interface PluginAgentDefinition {
  id: string;
  name: string;
  role: AgentRole;
  onEvent?: (event: string, payload: any) => Promise<void> | void;
}

// ────────────────────────────────────────────────
// PLUGIN MANIFEST
// ────────────────────────────────────────────────

export interface PluginManifest {
  id: string;
  name: string;
  version: string;

  capabilities?: Record<string, PluginCapabilityHandler>;

  autonomyActions?: {
    [actionName: string]: {
      capability: string;
      description?: string;
      defaultArgs?: any;
      priority?: number;
    };
  };

  ui?: PluginUIManifest;

  agents?: PluginAgentDefinition[];

  events?: Record<string, (payload: any) => Promise<void> | void>;
  routes?: any;
  init?: () => Promise<void> | void;
  shutdown?: () => Promise<void> | void;
}

export interface LoadedPlugin {
  manifest: PluginManifest;
  active: boolean;
  loadedAt: number;
}

