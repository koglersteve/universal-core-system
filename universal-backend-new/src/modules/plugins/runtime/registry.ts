export class PluginRegistry {
  private plugins = new Map<string, any>();
  private capabilities = new Map<string, any>();
  logger: any;

  constructor(opts: any) {
    this.logger = opts.logger;
  }

  // NEW API
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

  // LEGACY COMPATIBILITY (fixes your build errors)
  register(id: string, plugin: any) {
    return this.registerPlugin(id, plugin);
  }

  unregister(id: string) {
    return this.plugins.delete(id);
  }

  list() {
    return this.listPlugins();
  }
}
