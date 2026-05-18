import dotenv from "dotenv";
dotenv.config();

import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { cors } from "hono/cors";

import { config } from "@/core/config/config.js";

// OS / kernel
import { createKernel } from "@/os/kernel/kernel.js";
import { universeMiddleware } from "@/os/middleware/universe.js";

import { registerOSRoutes } from "@/os/os.routes.js";
import { registerMultiverseRoutes } from "@/os/multiverse.routes.js";
import { registerPersonaRoutes } from "@/os/persona.routes.js";
import { registerMemoryRoutes } from "@/os/memory.routes.js";
import { registerCognitiveRoutes } from "@/os/cognitive.routes.js";
import { registerBehaviorRoutes } from "@/os/behavior.routes.js";

// Core routes
import feedRoutes from "@/core/routes/feed.js";
import postRoutes from "@/core/routes/post.routes.js";
import profileRoutes from "@/core/routes/profile.routes.js";

// Module routes
import historyRoutes from "@/modules/routes/history.js";
import memeMyCatRoutes from "@/modules/routes/mememycat.routes.js";
import memeMyDogRoutes from "@/modules/routes/mememydog.routes.js";
import dramaNextDoorRoutes from "@/modules/routes/dramanextdoor.routes.js";
import hoaMemeRoutes from "@/modules/routes/hoameme.routes.js";
import idlyilyRoutes from "@/modules/routes/idlyily.routes.js";
import lafflabRoutes from "@/modules/routes/lafflab.routes.js";
import favoritesRoutes from "@/modules/routes/favorites.routes.js";
import jokesRoutes from "@/modules/routes/jokes.js";
import moodcheckRoutes from "@/modules/routes/moodcheck.routes.js";
import settingsRoutes from "@/modules/routes/settings.js";
import categoriesRoutes from "@/modules/routes/categories.js";
import postsRouter from "@/modules/routes/posts.js";

// Plugin runtime
import { PluginRegistry } from "@/modules/plugins/runtime/registry.js";
import { PluginLoader } from "@/modules/plugins/runtime/loader.js";
import { PluginLifecycleManager } from "@/modules/plugins/runtime/lifecycle.js";
import pluginRoutes from "@/modules/plugins/routes/plugin.routes.js";
import pluginUiRoutes from "@/modules/plugins/ui/routes.js";
import { capabilityRouter } from "@/modules/plugins/runtime/runtime/capabilityRouter.js";

const app = new Hono();

// CORS
app.use("*", cors());

// Kernel / OS
const kernel = createKernel();

app.use("*", async (c, next) => {
  // attach kernel if you want
  (c as any).kernel = kernel;
  await universeMiddleware(c, next);
});

// OS routes
registerOSRoutes(app);
registerMultiverseRoutes(app);
registerPersonaRoutes(app);
registerMemoryRoutes(app);
registerCognitiveRoutes(app);
registerBehaviorRoutes(app);

// Core routes
app.route("/core/feed", feedRoutes);
app.route("/core/posts", postRoutes);
app.route("/core/profile", profileRoutes);

// Module routes
app.route("/modules/history", historyRoutes);
app.route("/modules/mememycat", memeMyCatRoutes);
app.route("/modules/mememydog", memeMyDogRoutes);
app.route("/modules/dramanextdoor", dramaNextDoorRoutes);
app.route("/modules/hoameme", hoaMemeRoutes);
app.route("/modules/idlyily", idlyilyRoutes);
app.route("/modules/lafflab", lafflabRoutes);
app.route("/modules/favorites", favoritesRoutes);
app.route("/modules/jokes", jokesRoutes);
app.route("/modules/moodcheck", moodcheckRoutes);
app.route("/modules/settings", settingsRoutes);
app.route("/modules/categories", categoriesRoutes);
app.route("/modules/posts", postsRouter);

// Plugin system
const pluginRegistry = new PluginRegistry({
  logger: {
    info: console.log,
    error: console.error,
    warn: console.warn,
    debug: console.debug
  }
});

const pluginLifecycle = new PluginLifecycleManager(pluginRegistry);
const pluginLoader = new PluginLoader(pluginRegistry, pluginLifecycle);

const pluginCapabilityRouter = capabilityRouter(pluginRegistry);

pluginRoutes(app, pluginRegistry);
pluginUiRoutes(app, pluginRegistry);
app.route("/plugins/capabilities", pluginCapabilityRouter);

// Health
app.get("/", (c) =>
  c.json({
    message: "Universal Backend online",
    updatedAt: Date.now()
  })
);

const port = config.port ?? 8080;

serve({
  fetch: app.fetch,
  port,
  hostname: "0.0.0.0"
});
