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
// Core System Routes
// -----------------------------------------------------
import { registerOSRoutes } from "./os/os.routes";
import { registerMultiverseRoutes } from "./os/multiverse.routes";
import { registerMultiverseSwitchRoutes } from "./os/multiverse.switch.routes";
import { registerPersonaRoutes } from "./os/persona.routes";
import { registerMemoryRoutes } from "./os/memory.routes";
import { registerCognitiveRoutes } from "./os/cognitive.routes";
import { registerEmotionRoutes } from "./os/emotion.routes";
import { registerBehaviorRoutes } from "./os/behavior.routes";

// -----------------------------------------------------
// Module Routes
// -----------------------------------------------------
import { registerHistoryRoutes } from "./modules/routes/history.routes";
import { registerMemeMyCatRoutes } from "./modules/routes/mememycat.routes";
import { registerMemeMyDogRoutes } from "./modules/routes/mememydog.routes";
import { registerDramaNextDoorRoutes } from "./modules/routes/dramanextdoor.routes";
import { registerHoaMemeRoutes } from "./modules/routes/hoameme.routes";
import { registerIDLYILYRoutes } from "./modules/routes/idlyily.routes";
import { registerLaffLabRoutes } from "./modules/routes/lafflab.routes";

// -----------------------------------------------------
// Plugin Runtime
// -----------------------------------------------------
import { loadAllPlugins } from "./modules/plugins/runtime/loader";
import { initializePlugins } from "./modules/plugins/runtime/lifecycle";
import { pluginRegistry } from "./modules/plugins/runtime/registry";
import { pluginCapabilityRouter } from "./modules/plugins/runtime/capabilityRouter";
import { registerPluginRoutes } from "./modules/plugins/routes/plugin.routes";
import { registerPluginUIRoutes } from "./modules/plugins/ui/routes";

// -----------------------------------------------------
// Autonomy Engine
// -----------------------------------------------------
import { AutonomyEngine } from "./os/autonomy/engine";
import { loadPolicies } from "./os/autonomy/policies";
import { pluginAutonomyActions } from "./os/autonomy/pluginActions";
import { ActionRegistry, listActions } from "./os/autonomy/actions";
import { goalManager } from "./os/autonomy/goals";

// -----------------------------------------------------
// Event Bus
// -----------------------------------------------------
import { eventBus } from "./os/eventbus/bus";
import { registerAutonomyEventHandlers } from "./os/eventbus/handlers/autonomy.handler";

// -----------------------------------------------------
// Health Monitor
// -----------------------------------------------------
import { KernelHealthMonitor } from "./core/health/monitor";

// -----------------------------------------------------
// Dashboard
// -----------------------------------------------------
import { dashboardAggregator } from "./modules/dashboard/aggregator";
import { registerDashboardRoutes } from "./modules/dashboard/routes";

// -----------------------------------------------------
// Insight Engine
// -----------------------------------------------------
import { insightEngine } from "./os/insight/engine";
import { registerInsightEventHandlers } from "./os/insight/handlers";
import { registerInsightRoutes } from "./os/insight/routes";

// -----------------------------------------------------
// Agent Mesh
// -----------------------------------------------------
import { agentMesh } from "./os/agents/mesh";

// -----------------------------------------------------
// API Routes
// -----------------------------------------------------
import jokesRouter from "./shared/api/jokes";
import categoriesRouter from "./shared/api/categories";
import historyApiRouter from "./shared/api/history";
import dailyRitualRouter from "./shared/api/dailyRitual";

const app = new Hono();

// -----------------------------------------------------
// Global Bindings
// -----------------------------------------------------
globalThis.actions = {
  registry: ActionRegistry,
  list: listActions,
};

globalThis.goals = {
  add: goalManager.addGoal.bind(goalManager),
  list: goalManager.getActiveGoals.bind(goalManager),
  top: goalManager.getTopGoal.bind(goalManager),
  complete: goalManager.completeGoal.bind(goalManager),
};

(globalThis as any).eventBus = eventBus;
(globalThis as any).dashboardAggregator = dashboardAggregator;
(globalThis as any).insightEngine = insightEngine;
(globalThis as any).plugins = pluginRegistry;
(globalThis as any).pluginCapabilities = pluginCapabilityRouter;

// -----------------------------------------------------
// Event Handlers
// -----------------------------------------------------
registerAutonomyEventHandlers();
registerInsightEventHandlers();

// -----------------------------------------------------
// Plugin Boot
// -----------------------------------------------------
loadAllPlugins();
initializePlugins();
pluginAutonomyActions.loadFromPlugins();

// -----------------------------------------------------
// Agent Mesh Boot
// -----------------------------------------------------
agentMesh.startAll().then(() => {
  console.log("Agent Mesh v1 online");
});

// -----------------------------------------------------
// CORS
// -----------------------------------------------------
app.use("*", cors({ origin: config.cors.origin }));

// -----------------------------------------------------
// Kernel
// -----------------------------------------------------
app.route("/kernel", createKernel());

// -----------------------------------------------------
// Universe Middleware
// -----------------------------------------------------
app.use("*", universeMiddleware);

// -----------------------------------------------------
// Core OS Routes
// -----------------------------------------------------
registerOSRoutes(app);
registerMultiverseRoutes(app);
registerMultiverseSwitchRoutes(app);
registerPersonaRoutes(app);
registerMemoryRoutes(app);
registerCognitiveRoutes(app);
registerEmotionRoutes(app);
registerBehaviorRoutes(app);

// -----------------------------------------------------
// Module Routes
// -----------------------------------------------------
registerHistoryRoutes(app);
registerMemeMyCatRoutes(app);
registerMemeMyDogRoutes(app);
registerDramaNextDoorRoutes(app);
registerHoaMemeRoutes(app);
registerIDLYILYRoutes(app);
registerLaffLabRoutes(app);

// -----------------------------------------------------
// Plugin Routes
// -----------------------------------------------------
registerPluginRoutes(app);
registerPluginUIRoutes(app);

// -----------------------------------------------------
// Dashboard Routes
// -----------------------------------------------------
registerDashboardRoutes(app);

// -----------------------------------------------------
// Insight Routes
// -----------------------------------------------------
registerInsightRoutes(app);

// -----------------------------------------------------
// API Routes
// -----------------------------------------------------
app.route("/jokes", jokesRouter);
app.route("/categories", categoriesRouter);
app.route("/history", historyApiRouter);
app.route("/daily-ritual", dailyRitualRouter);

// -----------------------------------------------------
// Root Endpoint
// -----------------------------------------------------
app.get("/", (c) =>
  c.json({
    message: "Universal Core Backend Online",
    kernel: "/kernel/health",
    os: "/os",
    multiverse: "/multiverse/list",
    persona: "/persona/list",
    memory: "/memory/recent",
    cognitive: "/cognitive/state",
    emotion: "/emotion/state",
    behavior: "/behavior/state",
    insights: "/insights/recent",
    dashboard: "/os/dashboard/state",
    plugins: "/plugins/list",
    pluginsUI: "/plugins/ui",
    version: "1.0.0",
  })
);

// -----------------------------------------------------
// Autonomy Engine Boot
// -----------------------------------------------------
const autonomy = new AutonomyEngine({
  policies: loadPolicies(),
  tickInterval: 1000,
});

autonomy.start();
console.log("Autonomy Engine v1 online");

// -----------------------------------------------------
// Kernel Health Monitor Boot
// -----------------------------------------------------
const healthMonitor = new KernelHealthMonitor({ interval: 5000 });
healthMonitor.start();
console.log("Kernel Health Monitor online");

// -----------------------------------------------------
// Server Boot
// -----------------------------------------------------
const port = Number(config.port) || 8080;
serve({ fetch: app.fetch, port });

console.log(`Universal Core Backend running on port ${port}`);
