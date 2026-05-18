import { pluginRegistry } from "./registry";
import examplePlugin from "../manifests/example.plugin";
import lafflabPlugin from "../manifests/lafflab.plugin";

export function loadAllPlugins() {
  pluginRegistry.register(examplePlugin);
  pluginRegistry.register(lafflabPlugin);
}
