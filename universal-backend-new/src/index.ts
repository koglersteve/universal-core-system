import { Hono } from "hono";

// Core middleware
import { universeMiddleware } from "@/core/middleware/universe.middleware.js";
import { emotionalOSLogger } from "@/core/middleware/os-logger.middleware.js";

// Core universal routes
import feedRoutes from "@/core/routes/feed.routes.js";
import favoritesRoutes from "@/core/routes/favorites.routes.js";
import historyRoutes from "@/core/routes/history.routes.js";
import profileRoutes from "@/core/routes/profile.routes.js";
import settingsRoutes from "@/core/routes/settings.routes.js";
import searchRoutes from "@/core/routes/search.routes.js";

// Cross-app emotional engine routes
import reactionsRoutes from "@/core/crossapp/reactions.routes.js";
import impressionsRoutes from "@/core/crossapp/impressions.routes.js";

// Emotional OS Dashboard
import osRoutes from "@/core/routes/os.routes.js";

const app = new Hono();

/* -------------------------------------------------------
   GLOBAL MIDDLEWARE
-------------------------------------------------------- */
app.use("*", universeMiddleware);
app.use("*", emotionalOSLogger);

/* -------------------------------------------------------
   ROOT + GLOBAL HEALTH CHECKS
-------------------------------------------------------- */

// Root route
app.get("/", (c) =>
  c.json({
    status: "Universal Backend Online",
    message: "Welcome to the Emotional OS Universal Backend",
    uptime: process.uptime(),
  })
);

// Global health check
app.get("/health", (c) =>
  c.json({
    ok: true,
    service: "universal-backend",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  })
);

/* -------------------------------------------------------
   ROUTE-SPECIFIC HEALTH CHECKS
-------------------------------------------------------- */

app.get("/core/feed/health", (c) => c.json({ ok: true, route: "/core/feed" }));
app.get("/core/favorites/health", (c) => c.json({ ok: true, route: "/core/favorites" }));
app.get("/core/history/health", (c) => c.json({ ok: true, route: "/core/history" }));
app.get("/core/profile/health", (c) => c.json({ ok: true, route: "/core/profile" }));
app.get("/core/settings/health", (c) => c.json({ ok: true, route: "/core/settings" }));
app.get("/core/search/health", (c) => c.json({ ok: true, route: "/core/search" }));

app.get("/core/reactions/health", (c) => c.json({ ok: true, route: "/core/reactions" }));
app.get("/core/impressions/health", (c) => c.json({ ok: true, route: "/core/impressions" }));
app.get("/core/os/health", (c) => c.json({ ok: true, route: "/core/os" }));

/* -------------------------------------------------------
   ROUTE SUMMARY (SUPER USEFUL)
-------------------------------------------------------- */

app.get("/core/routes", (c) =>
  c.json({
    routes: [
      "/core/feed",
      "/core/favorites",
      "/core/history",
      "/core/profile",
      "/core/settings",
      "/core/search",
      "/core/reactions",
      "/core/impressions",
      "/core/os",
    ],
  })
);

/* -------------------------------------------------------
   MOUNT ACTUAL ROUTES
-------------------------------------------------------- */

app.route("/core/feed", feedRoutes);
app.route("/core/favorites", favoritesRoutes);
app.route("/core/history", historyRoutes);
app.route("/core/profile", profileRoutes);
app.route("/core/settings", settingsRoutes);
app.route("/core/search", searchRoutes);

app.route("/core/reactions", reactionsRoutes);
app.route("/core/impressions", impressionsRoutes);

app.route("/core/os", osRoutes);

export default app;
