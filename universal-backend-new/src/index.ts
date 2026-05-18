import dotenv from "dotenv";
dotenv.config();

import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { cors } from "hono/cors";

import { config } from "./core/config/config";

// -----------------------------------------------------
// Kernel + OS
// -----------------------------------------------------
import { createKernel } from "./os/kernel/kernel";
import { universeMiddleware } from "./os/middleware/universe";

// -----------------------------------------------------
// Emotional OS Routes
// -----------------------------------------------------
import { registerOSRoutes } from "./os/os.routes";
import { registerMultiverseRoutes } from "./os/multiverse.routes";
import { registerPersonaRoutes } from "./os/persona.routes";
import { registerMemoryRoutes } from "./os/memory.routes";
import { registerCognitiveRoutes } from "./os/cognitive.routes";
import { registerEmotionRoutes } from "./os/emotion.routes";
import { registerBehaviorRoutes } from "./os/behavior.routes";

// -----------------------------------------------------
// Module Routes (Production Versions)
// -----------------------------------------------------
import historyRoutes from "./modules/routes/history";
import memeMyCatRoutes from "./modules/routes/mememycat.routes";
import memeMyDogRoutes from "./modules/routes/mememydog.routes";
import dramaNextDoorRoutes from "./modules/routes/dramanextdoor.routes";
import hoaMemeRoutes from "./modules/routes/hoameme.routes";
import idlyilyRoutes from "./modules/routes/idlyily.routes";
import lafflabRoutes from "./modules/routes/lafflab.routes";

// -----------------------------------------------------
// Plugin Runtime (Production Versions)
// -----------------------------------------------------
import { PluginRegistry } from "./modules/plugins/runtime/registry";
import { PluginLoader } from "./modules/plugins/runtime/loader";
import { PluginLifecycleManager } from "./modules/plugins/runtime/lifecycle";
import pluginRoutes from "./modules/plugins/routes/plugin.routes";
import pluginUiRoutes from "./modules/plugins/ui/routes";
import { capabilityRouter } from "./modules/plugins/runtime/capabilityRouter";

// -----------------------------------------------------
// Shared API Routes
// -----------------------------------------------------
import jokesRouter from "./shared/api/jokes";
import categoriesRouter from "./shared/api/categories";
import historyApiRouter from "./shared/api/history";

// -----------------------------------------------------
// Emotional Engine (Global)
// -----------------------------------------------------
import { EmotionalEngine } from "./os/engine";

// -----------------------------------------------------
// Initialize App
// -----------------------------------------------------
const app = new Hono();

// -----------------------------------------------------
// Plugin System Boot
// -----------------------------------------------------
const pluginRegistry = new PluginRegistry({
  logger: console,
  config: {}
});

const pluginLoader = new PluginLoader(pluginRegistry);
const pluginLifecycle = new PluginLifecycleManager(pluginRegistry);

await pluginLoader.loadFromDir("./src/modules/plugins/manifests");
console.log("Plugins loaded");

process.on("SIGTERM", () => pluginLifecycle.shutdown());
process.on("SIGINT", () => pluginLifecycle.shutdown());

// -----------------------------------------------------
// CORS
// -----------------------------------------------------
app.use("*", cors({ origin: "*" }));

// -----------------------------------------------------
// Kernel
// -----------------------------------------------------
app.route("/kernel", createKernel());

// -----------------------------------------------------
// Universe Middleware
// -----------------------------------------------------
app.use("*", universeMiddleware);

// -----------------------------------------------------
// Emotional OS Routes
// -----------------------------------------------------
registerOSRoutes(app);
registerMultiverseRoutes(app);
registerPersonaRoutes(app);
registerMemoryRoutes(app);
registerCognitiveRoutes(app);
registerEmotionRoutes(app);
registerBehaviorRoutes(app);

// -----------------------------------------------------
// Module Routes
// -----------------------------------------------------
app.route("/history", historyRoutes);
app.route("/mememycat", memeMyCatRoutes);
app.route("/mememydog", memeMyDogRoutes);
app.route("/dramanextdoor", dramaNextDoorRoutes);
app.route("/hoameme", hoaMemeRoutes);
app.route("/idlyily", idlyilyRoutes);
app.route("/lafflab", lafflabRoutes);

// -----------------------------------------------------
// Plugin Routes
// -----------------------------------------------------
app.route("/plugins", pluginRoutes(pluginRegistry));
app.route("/plugins/ui", pluginUiRoutes(pluginRegistry));
app.route("/capabilities", capabilityRouter(pluginRegistry));

// -----------------------------------------------------
// Shared API Routes
// -----------------------------------------------------
app.route("/jokes", jokesRouter);
app.route("/categories", categoriesRouter);
app.route("/history-api", historyApiRouter);

// -----------------------------------------------------
// Root Endpoint
// -----------------------------------------------------
app.get("/", (c) =>
  c.json({
    message: "Universal Core Backend Online",
    kernel: "/kernel/health",
    os: "/os",
    multiverse: "/multiverse/list",
    persona: "/persona/state",
    memory: "/memory/recent",
    cognitive: "/cognitive/state",
    emotion: "/emotion/state",
    behavior: "/behavior/state",
    plugins: "/plugins",
    version: "2.0.0"
  })
);

// -----------------------------------------------------
// Server Boot
// -----------------------------------------------------
const port = Number(config.port) || 8080;
serve({ fetch: app.fetch, port });

console.log(`Universal Backend running on port ${port}`);
