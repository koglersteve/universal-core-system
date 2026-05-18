diff --git a/src/modules/routes/categories.ts b/src/modules/routes/categories.ts
index 1111111..2222222 100644
--- a/src/modules/routes/categories.ts
+++ b/src/modules/routes/categories.ts
@@ -1,4 +1,4 @@
-import prisma from "../../shared/prisma";
+import prisma from "@/shared/prisma.js";

 export default function categoriesRoutes(app: any) {
