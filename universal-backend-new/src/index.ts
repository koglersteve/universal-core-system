import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { cors } from "hono/cors";

import { config } from "./config/config";

// --- Kernel ---
import { createKernel } from "./kernel/kernel";

// --- Middleware ---
import { universeMiddleware } from "./middleware/universe";

// --- Core Routes ---
import { registerOSRoutes } from "./routes/os.routes";
import { registerMultiverseRoutes } from "./routes/multiverse.routes";
import { registerMultiverseSwitchRoutes } from "./routes/multiverse.switch.routes";
import { registerPersonaRoutes } from "./routes/persona.routes";
import { registerMemoryRoutes } from "./routes/memory.routes";
import { registerCognitiveRoutes } from "./routes/cognitive.routes";
import { registerEmotionRoutes } from "./routes/emotion.routes";
import { registerBehaviorRoutes } from "./routes/behavior.routes";

// --- Plugin Routes ---
import { registerDramaNextDoorRoutes } from "./routes/dramanextdoor.routes";
import { registerHoaMemeRoutes } from "./routes/hoameme.routes";
import { registerIDLYILYRoutes } from "./routes/idlyily.routes";
import { registerLaffLabRoutes } from "./routes/lafflab.routes";
import { registerMemeMyCatRoutes } from "./routes/mememycat.routes";
import { registerMemeMyDogRoutes } from "./routes/mememydog.routes";
import { registerHistoryRoutes } from "./routes/history.routes";

// --- Autonomy Engine ---
import { AutonomyEngine } from "./autonomy/engine";
import { loadPolicies } from "./autonomy/policies";

// --- Global Registries ---
import { ActionRegistry, listActions } from "./autonomy/actions";
import { goalManager } from "./autonomy/goals";

// --- Event Bus ---
import { eventBus } from "./eventbus/bus";
import { registerAutonomyEventHandlers } from "./eventbus/handlers/autonomy.handler";

// --- Health Monitor ---
import { KernelHealthMonitor } from "./health/monitor";

// --- Dashboard Aggregator ---
import { dashboardAggregator } from "./dashboard/aggregator";
import { registerDashboardRoutes } from "./dashboard/routes";

// --- Insight Engine ---
import { insightEngine } from "./insight/engine";
import { registerInsightEventHandlers } from "./insight/handlers";

const app = new Hono();

// -----------------------------------------------------
// Global Bindings (must be BEFORE engines start)
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

registerAutonomyEventHandlers();
registerInsightEventHandlers();

// -----------------------------------------------------
// CORS
// -----------------------------------------------------
app.use(
  "*",
  cors({
    origin: config.cors.origin,
  })
);

// -----------------------------------------------------
// Kernel
// -----------------------------------------------------
app.route("/kernel", createKernel());

// -----------------------------------------------------
// Universe Middleware (global)
// -----------------------------------------------------
app.use("*", universeMiddleware);

// -----------------------------------------------------
// Core System Routes
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
// Plugin Routes
// -----------------------------------------------------
registerDramaNextDoorRoutes(app);
registerHoaMemeRoutes(app);
registerIDLYILYRoutes(app);
registerLaffLabRoutes(app);
registerMemeMyCatRoutes(app);
registerMemeMyDogRoutes(app);
registerHistoryRoutes(app);

// -----------------------------------------------------
// Dashboard Routes
// -----------------------------------------------------
registerDashboardRoutes(app);

// -----------------------------------------------------
// Insight Routes
// -----------------------------------------------------
import { registerInsightRoutes } from "./insight/routes";
registerInsightRoutes(app);

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
    version: "1.0.0",
  })
);

// -----------------------------------------------------
// Autonomy Engine v1 Boot
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
const healthMonitor = new KernelHealthMonitor({
  interval: 5000,
});

healthMonitor.start();
console.log("Kernel Health Monitor online");

// -----------------------------------------------------
// Server Boot
// -----------------------------------------------------
const port = Number(config.port) || 8080;
serve({ fetch: app.fetch, port });

console.log(`Universal Core Backend running on port ${port}`);
