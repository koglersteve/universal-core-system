diff --git a/src/os/kernel/kernel.ts b/src/os/kernel/kernel.ts
index 1111111..2222222 100644
--- a/src/os/kernel/kernel.ts
+++ b/src/os/kernel/kernel.ts
@@ -1,6 +1,6 @@
-import { registerOSRoutes } from "../os.routes";
-import { registerCognitiveRoutes } from "../cognitive.routes";
-import { registerBehaviorRoutes } from "../behavior.routes";
+import { registerOSRoutes } from "@/os/os.routes.js";
+import { registerCognitiveRoutes } from "@/os/cognitive.routes.js";
+import { registerBehaviorRoutes } from "@/os/behavior.routes.js";

 export function createKernel() {
