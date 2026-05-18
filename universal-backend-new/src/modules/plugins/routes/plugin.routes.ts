diff --git a/src/modules/plugins/routes/plugin.routes.ts b/src/modules/plugins/routes/plugin.routes.ts
index 1111111..2222222 100644
--- a/src/modules/plugins/routes/plugin.routes.ts
+++ b/src/modules/plugins/routes/plugin.routes.ts
@@ -1,4 +1,4 @@
-import { PluginRegistry } from "../runtime/registry";
+import { PluginRegistry } from "@/modules/plugins/runtime/registry.js";

 export default function pluginRoutes(registry: PluginRegistry) {
