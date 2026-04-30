import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { cors } from "hono/cors";

import { config } from "./config/config";

import { createKernel } from "./kernel/kernel";
import { registerOSRoutes } from "./routes/os.routes";
import { registerMultiverseRoutes } from "./routes/multiverse.routes";
import { registerMultiverseSwitchRoutes } from "./routes/multiverse.switch.routes";
import { registerPersonaRoutes } from "./routes/persona.routes";
import { registerMemoryRoutes } from "./routes/memory.routes";
import { universeMiddleware } from "./middleware/universe";

// --- Plugin Routes ---
import { registerDramaNextDoorRoutes } from "./routes/dramanextdoor.routes";
import { registerHoaMemeRoutes } from "./routes/hoameme.routes";
import { registerIDLYILYRoutes } from "./routes/idlyily.routes";
import { registerLaffLabRoutes } from "./routes/lafflab.routes";
import { registerMemeMyCatRoutes } from "./routes/mememycat.routes";
import { registerMemeMyDogRoutes } from "./routes/mememydog.routes";
import { registerHistoryRoutes } from "./routes/history.routes";

const app = new Hono();

// --- CORS ---
app.use(
  "*",
  cors({
    origin: config.cors.origin,
  })
);

// --- Kernel ---
app.route("/kernel", createKernel());

// --- Universe Middleware ---
app.use("*", universeMiddleware);

// --- OS Namespace ---
registerOSRoutes(app);

// --- Multiverse ---
registerMultiverseRoutes(app);
registerMultiverseSwitchRoutes(app);

// --- Persona OS ---
registerPersonaRoutes(app);

// --- Memory Engine ---
registerMemoryRoutes(app);

// --- Plugins ---
registerDramaNextDoorRoutes(app);
registerHoaMemeRoutes(app);
registerIDLYILYRoutes(app);
registerLaffLabRoutes(app);
registerMemeMyCatRoutes(app);
registerMemeMyDogRoutes(app);
registerHistoryRoutes(app);

// --- Root ---
app.get("/", (c) =>
  c.json({
    message: "Universal Core Backend Online",
    kernel: "/kernel/health",
    os: "/os",
    multiverse: "/multiverse/list",
    persona: "/persona/list",
    memory: "/memory/recent",
    version: "1.0.0",
  })
);

// --- Boot ---
const port = Number(config.port) || 8080;
serve({ fetch: app.fetch, port });

console.log(`Universal Core Backend running on port ${port}`);
