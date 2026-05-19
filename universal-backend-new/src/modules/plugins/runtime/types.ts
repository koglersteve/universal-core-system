export interface PluginRuntime {
  onLoad?(ctx: any): void | Promise<void>;
  onUnload?(ctx: any): void | Promise<void>;
}

export interface PluginDefinition {
  id: string;
  name: string;
  version: string;
  capabilities?: string[];
  runtime?: PluginRuntime;
}

