diff --git a/src/core/routes/post.routes.ts b/src/core/routes/post.routes.ts
index 1111111..2222222 100644
--- a/src/core/routes/post.routes.ts
+++ b/src/core/routes/post.routes.ts
@@ -1,6 +1,6 @@
-import prisma from "../../shared/prisma";
-import { z } from "zod";
-import { nanoid } from "nanoid";
+import prisma from "@/shared/prisma.js";
+import { z } from "zod";
+import { nanoid } from "nanoid";

 export default function postRoutes(app: any) {
   app.get("/", async (c: any) => {
