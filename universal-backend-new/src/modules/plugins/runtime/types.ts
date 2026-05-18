import { Logger } from "pino";

export interface PluginContext {
  logger: Logger;
  config: Record<string, unknown>;
}

export interface PluginRuntime {
  onLoad?: (ctx: PluginContext) => Promise<void>;
  onUnload?: (ctx: PluginContext) => Promise<void>;
}

export interface PluginManifest {
  id: string;
  name: string;
  version: string;
  capabilities: string[];
  runtime?: PluginRuntime;
}

export interface LoadedPlugin {
  manifest: PluginManifest;
  instance: PluginRuntime;
}

