diff --git a/src/modules/plugins/runtime/loader.ts b/src/modules/plugins/runtime/loader.ts
index 1111111..2222222 100644
--- a/src/modules/plugins/runtime/loader.ts
+++ b/src/modules/plugins/runtime/loader.ts
@@ -1,6 +1,6 @@
-import { PluginRegistry } from "./registry";
-import { PluginDefinition } from "./types";
-import { PluginLifecycleManager } from "./lifecycle";
+import { PluginRegistry } from "@/modules/plugins/runtime/registry.js";
+import { PluginDefinition } from "@/modules/plugins/runtime/types.js";
+import { PluginLifecycleManager } from "@/modules/plugins/runtime/lifecycle.js";

 export class PluginLoader {
