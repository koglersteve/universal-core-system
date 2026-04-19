import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { cors } from "hono/cors";

import { createKernel } from "./kernel/kernel";
import { registerOSRoutes } from "./routes/os.routes";
import { registerMultiverseRoutes } from "./routes/multiverse.routes";
import { universeMiddleware } from "./middleware/universe";

const app = new Hono();

// --- CORS (must be first middleware) ---
app.use(
  "*",
  cors({
    origin: "https://universal-core-frontend-production-8ae4.up.railway.app",
  })
);

// --- Kernel (always mount first) ---
app.route("/kernel", createKernel());

// --- Universe-Aware Middleware (must come before OS + Multiverse) ---
app.use("*", universeMiddleware);

// --- OS Namespace ---
registerOSRoutes(app);

// --- Multiverse Namespace ---
registerMultiverseRoutes(app);

// --- Optional Root Route ---
app.get("/", (c) =>
  c.json({
    message: "Universal Core Backend Online",
    kernel: "/kernel/health",
    os: "/os",
    multiverse: "/multiverse/list",
    version: "1.0.0",
  })
);

// --- Boot Kernel ---
const port = Number(process.env.PORT) || 8080;
serve({ fetch: app.fetch, port });

console.log(`Universal Core Backend running on port ${port}`);




