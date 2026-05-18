diff --git a/src/core/routes/feed.ts b/src/core/routes/feed.ts
index 1111111..2222222 100644
--- a/src/core/routes/feed.ts
+++ b/src/core/routes/feed.ts
@@ -1,4 +1,4 @@
-import prisma from "../../shared/prisma";
+import prisma from "@/shared/prisma.js";

 export default async function feedRoutes(app: any) {
   app.get("/", async (c: any) => {
