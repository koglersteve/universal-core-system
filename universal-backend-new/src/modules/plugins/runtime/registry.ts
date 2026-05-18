export type PluginRegistryOptions = {
  logger: {
    info: (...args: any[]) => void;
    error: (...args: any[]) => void;
    warn: (...args: any[]) => void;
    debug: (...args: any[]) => void;
  };
  config: Record<string, unknown>;
};

export class PluginRegistry {
  private plugins = new Map<string, any>();
  private capabilities = new Map<string, any>();
  private logger: PluginRegistryOptions["logger"];

  constructor(opts: PluginRegistryOptions) {
    this.logger = opts.logger;
  }

  registerPlugin(id: string, plugin: any) {
    this.plugins.set(id, plugin);
    this.logger.info(`Registered plugin ${id}`);
  }

  listPlugins() {
    return Array.from(this.plugins.values());
  }

  getPlugin(id: string) {
    return this.plugins.get(id);
  }

  registerCapability(name: string, handler: any) {
    this.capabilities.set(name, handler);
  }

  listCapabilities() {
    return Array.from(this.capabilities.keys());
  }

  getCapability(name: string) {
    return this.capabilities.get(name);
  }
}
