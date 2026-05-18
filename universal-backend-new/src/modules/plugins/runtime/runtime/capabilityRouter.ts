diff --git a/src/modules/plugins/runtime/runtime/capabilityRouter.ts b/src/modules/plugins/runtime/runtime/capabilityRouter.ts
index 1111111..2222222 100644
--- a/src/modules/plugins/runtime/runtime/capabilityRouter.ts
+++ b/src/modules/plugins/runtime/runtime/capabilityRouter.ts
@@ -1,5 +1,5 @@
-import { PluginRegistry } from "../registry";
-import { PluginDefinition } from "../types";
+import { PluginRegistry } from "@/modules/plugins/runtime/registry.js";
+import { PluginDefinition } from "@/modules/plugins/runtime/types.js";

 export function capabilityRouter(registry: PluginRegistry) {
