export interface PluginManifest {
  id: string;
  name: string;
  version: string;
  capabilities: string[];
  routes: string[];
  enabled: boolean;
}

