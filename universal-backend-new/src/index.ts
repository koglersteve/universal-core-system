import dotenv from "dotenv";
dotenv.config();

import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { cors } from "hono/cors";

import { config } from "@/core/config/config.js";

// Kernel / OS
import { createKernel } from "@/os/kernel/kernel.js";
import { universeMiddleware } from "@/os/middleware/universe.js";

// OS Routers
import osRoutes from "@/os/os.routes.js";
import multiverseRoutes from "@/os/multiverse.routes.js";
import personaRoutes from "@/os/persona.routes.js";
import memoryRoutes from "@/os/memory.routes.js";
import cognitiveRoutes from "@/os/cognitive.routes.js";
import behaviorRoutes from "@/os/behavior.routes.js";

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

// Plugin system
import { PluginRegistry } from "@/modules/plugins/runtime/registry.js";
import { PluginLoader } from "@/modules/plugins/runtime/loader.js";
import { PluginLifecycleManager } from "@/modules/plugins/runtime/lifecycle.js";
import pluginRoutes from "@/modules/plugins/routes/plugin.routes.js";
import pluginUiRoutes from "@/modules/plugins/ui/routes.js";
import { capabilityRouter } from "@/modules/plugins/runtime/runtime/capabilityRouter.js";

const app = new Hono();

// CORS
app.use("*", cors());

// Kernel
const kernel = createKernel();

app.use("*", async (c, next) => {
  (c as any).kernel = kernel;
  await universeMiddleware(c, next);
});

// OS routes
app.route("/os", osRoutes);
app.route("/multiverse", multiverseRoutes);
app.route("/persona", personaRoutes);
app.route("/memory", memoryRoutes);
app.route("/cognitive", cognitiveRoutes);
app.route("/behavior", behaviorRoutes);

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
  logger: console
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

const port = Number(config.port) || 8080;

serve({
  fetch: app.fetch,
  port,
  hostname: "0.0.0.0"
});
