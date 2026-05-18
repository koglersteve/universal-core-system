diff --git a/src/index.ts b/src/index.ts
index 1111111..2222222 100644
--- a/src/index.ts
+++ b/src/index.ts
@@ -1,33 +1,33 @@
 import dotenv from "dotenv";
 dotenv.config();

 import { Hono } from "hono";
 import { serve } from "@hono/node-server";
 import { cors } from "hono/cors";

-import { config } from "./core/config/config";
+import { config } from "@/core/config/config.js";

 // -----------------------------------------------------
 // Kernel + OS
 // -----------------------------------------------------
-import { createKernel } from "./os/kernel/kernel";
-import { universeMiddleware } from "./os/middleware/universe";
+import { createKernel } from "@/os/kernel/kernel.js";
+import { universeMiddleware } from "@/os/middleware/universe.js";

 // -----------------------------------------------------
 // Emotional OS Routes
 // -----------------------------------------------------
-import { registerOSRoutes } from "./os/os.routes";
-import { registerMultiverseRoutes } from "./os/multiverse.routes";
-import { registerPersonaRoutes } from "./os/persona.routes";
-import { registerMemoryRoutes } from "./os/memory.routes";
-import { registerCognitiveRoutes } from "./os/cognitive.routes";
-import { registerBehaviorRoutes } from "./os/behavior.routes";
+import { registerOSRoutes } from "@/os/os.routes.js";
+import { registerMultiverseRoutes } from "@/os/multiverse.routes.js";
+import { registerPersonaRoutes } from "@/os/persona.routes.js";
+import { registerMemoryRoutes } from "@/os/memory.routes.js";
+import { registerCognitiveRoutes } from "@/os/cognitive.routes.js";
+import { registerBehaviorRoutes } from "@/os/behavior.routes.js";

 // -----------------------------------------------------
 // Core Routes
 // -----------------------------------------------------
-import feedRoutes from "./core/routes/feed";
-import postRoutes from "./core/routes/post.routes";
-import profileRoutes from "./core/routes/profile.routes";
+import feedRoutes from "@/core/routes/feed.js";
+import postRoutes from "@/core/routes/post.routes.js";
+import profileRoutes from "@/core/routes/profile.routes.js";

 // -----------------------------------------------------
 // Module Routes
@@ -35,28 +35,28 @@
-import historyRoutes from "./modules/routes/history";
-import memeMyCatRoutes from "./modules/routes/mememycat.routes";
-import memeMyDogRoutes from "./modules/routes/mememydog.routes";
-import dramaNextDoorRoutes from "./modules/routes/dramanextdoor.routes";
-import hoaMemeRoutes from "./modules/routes/hoameme.routes";
-import idlyilyRoutes from "./modules/routes/idlyily.routes";
-import lafflabRoutes from "./modules/routes/lafflab.routes";
-import favoritesRoutes from "./modules/routes/favorites.routes";
-import jokesRoutes from "./modules/routes/jokes";
-import moodcheckRoutes from "./modules/routes/moodcheck.routes";
-import settingsRoutes from "./modules/routes/settings";
-import categoriesRoutes from "./modules/routes/categories";
+import historyRoutes from "@/modules/routes/history.js";
+import memeMyCatRoutes from "@/modules/routes/mememycat.routes.js";
+import memeMyDogRoutes from "@/modules/routes/mememydog.routes.js";
+import dramaNextDoorRoutes from "@/modules/routes/dramanextdoor.routes.js";
+import hoaMemeRoutes from "@/modules/routes/hoameme.routes.js";
+import idlyilyRoutes from "@/modules/routes/idlyily.routes.js";
+import lafflabRoutes from "@/modules/routes/lafflab.routes.js";
+import favoritesRoutes from "@/modules/routes/favorites.routes.js";
+import jokesRoutes from "@/modules/routes/jokes.js";
+import moodcheckRoutes from "@/modules/routes/moodcheck.routes.js";
+import settingsRoutes from "@/modules/routes/settings.js";
+import categoriesRoutes from "@/modules/routes/categories.js";

 // -----------------------------------------------------
 // Plugin Runtime
 // -----------------------------------------------------
-import { PluginRegistry } from "./modules/plugins/runtime/registry";
-import { PluginLoader } from "./modules/plugins/runtime/loader";
-import { PluginLifecycleManager } from "./modules/plugins/runtime/lifecycle";
-import pluginRoutes from "./modules/plugins/routes/plugin.routes";
-import pluginUiRoutes from "./modules/plugins/ui/routes";
-import { capabilityRouter } from "./modules/plugins/runtime/runtime/capabilityRouter";
+import { PluginRegistry } from "@/modules/plugins/runtime/registry.js";
+import { PluginLoader } from "@/modules/plugins/runtime/loader.js";
+import { PluginLifecycleManager } from "@/modules/plugins/runtime/lifecycle.js";
+import pluginRoutes from "@/modules/plugins/routes/plugin.routes.js";
+import pluginUiRoutes from "@/modules/plugins/ui/routes.js";
+import { capabilityRouter } from "@/modules/plugins/runtime/runtime/capabilityRouter.js";

