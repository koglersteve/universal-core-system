export class PluginRegistry {
  private plugins = new Map<string, any>();
  private capabilities = new Map<string, any>();
  logger: any;

  constructor(opts: { logger: any }) {
    this.logger = opts.logger;
  }

  registerPlugin(id: string, plugin: any) {
    this.plugins.set(id, plugin);
    this.logger.info?.(`Registered plugin: ${id}`);
  }

  registerCapability(name: string, handler: any) {
    this.capabilities.set(name, handler);
    this.logger.info?.(`Registered capability: ${name}`);
  }

  listPlugins() {
    return Array.from(this.plugins.values());
  }

  getPlugin(id: string) {
    return this.plugins.get(id);
  }

  listCapabilities() {
    return Array.from(this.capabilities.keys());
  }

  getCapability(name: string) {
    return this.capabilities.get(name);
  }
}
