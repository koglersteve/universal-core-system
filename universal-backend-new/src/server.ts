import dotenv from "dotenv";
dotenv.config();

import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { cors } from "hono/cors";

import { config } from "./shared/config/config";

import { universeMiddleware } from "./os/middleware/universe";
import { createKernel } from "./os/kernel/kernel";

import { registerOSRoutes } from "./os/os.routes";
import { registerMultiverseRoutes } from "./os/multiverse.routes";
import { registerPersonaRoutes } from "./os/persona.routes";
import { registerMemoryRoutes } from "./os/memory.routes";
import { registerCognitiveRoutes } from "./os/cognitive.routes";
import { registerEmotionRoutes } from "./os/emotion.routes";
import { registerBehaviorRoutes } from "./os/behavior.routes";

import { registerHistoryRoutes } from "./modules/routes/history";
import { registerMemeMyCatRoutes } from "./modules/routes/mememycat.routes";
import { registerMemeMyDogRoutes } from "./modules/routes/mememydog.routes";
import { registerDramaNextDoorRoutes } from "./modules/routes/dramanextdoor.routes";
import { registerHoaMemeRoutes } from "./modules/routes/hoameme.routes";
import { registerIDLYILYRoutes } from "./modules/routes/idlyily.routes";
import { registerLaffLabRoutes } from "./modules/routes/lafflab.routes";

import { registerPluginRoutes } from "./modules/plugins/routes/plugin.routes";
import { registerPluginUIRoutes } from "./modules/plugins/ui/routes";

import { registerDashboardRoutes } from "./modules/dashboard/routes";
import { registerInsightRoutes } from "./os/insight/routes";

import jokesRoute from "./modules/routes/jokes";
import historyApiRoute from "./modules/routes/history";
import favoritesRoute from "./modules/routes/favorites.routes";
import categoriesRoute from "./shared/api/categories";
import dailyRitualRoute from "./shared/api/dailyRitual";

const app = new Hono();

app.use("*", cors({ origin: "*" }));
app.use("*", universeMiddleware);

app.route("/kernel", createKernel());

registerOSRoutes(app);
registerMultiverseRoutes(app);
registerPersonaRoutes(app);
registerMemoryRoutes(app);
registerCognitiveRoutes(app);
registerEmotionRoutes(app);
registerBehaviorRoutes(app);

registerHistoryRoutes(app);
registerMemeMyCatRoutes(app);
registerMemeMyDogRoutes(app);
registerDramaNextDoorRoutes(app);
registerHoaMemeRoutes(app);
registerIDLYILYRoutes(app);
registerLaffLabRoutes(app);

registerPluginRoutes(app);
registerPluginUIRoutes(app);

registerDashboardRoutes(app);
registerInsightRoutes(app);

app.route("/jokes", jokesRoute);
app.route("/history", historyApiRoute);
app.route("/favorites", favoritesRoute);
app.route("/categories", categoriesRoute);
app.route("/daily-ritual", dailyRitualRoute);

app.get("/", (c) =>
  c.json({
    message: "Universal Core Backend Online",
    version: "1.0.0",
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
    pluginsUI: "/plugins/ui"
  })
);

const port = Number(config.port) || 8080;

serve({ fetch: app.fetch, port });

console.log(`Universal Core Backend running on port ${port}`);
