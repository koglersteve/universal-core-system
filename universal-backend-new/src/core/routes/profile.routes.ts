diff --git a/src/core/routes/profile.routes.ts b/src/core/routes/profile.routes.ts
index 1111111..2222222 100644
--- a/src/core/routes/profile.routes.ts
+++ b/src/core/routes/profile.routes.ts
@@ -1,5 +1,5 @@
-import prisma from "../../shared/prisma";
-import { z } from "zod";
+import prisma from "@/shared/prisma.js";
+import { z } from "zod";

 export default function profileRoutes(app: any) {
   app.get("/", async (c: any) => {
