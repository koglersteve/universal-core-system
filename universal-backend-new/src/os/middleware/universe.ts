diff --git a/src/os/middleware/universe.ts b/src/os/middleware/universe.ts
index 1111111..2222222 100644
--- a/src/os/middleware/universe.ts
+++ b/src/os/middleware/universe.ts
@@ -1,4 +1,4 @@
-import { UniverseContext } from "./universe.types";
+import { UniverseContext } from "@/os/middleware/universe.types.js";

 export const universeMiddleware = async (c: any, next: any) => {
