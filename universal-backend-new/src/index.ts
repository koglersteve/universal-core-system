import { Hono } from "hono";
import { serve } from "@hono/node-server";

/* -------------------------------------------------------
   APP INIT
-------------------------------------------------------- */

const app = new Hono();

/* -------------------------------------------------------
   ROOT + GLOBAL HEALTH CHECKS
-------------------------------------------------------- */

app.get("/", (c) =>
  c.json({
    status: "Universal Backend Online",
    message: "Welcome to the Emotional OS Universal Backend",
    uptime: process.uptime(),
  })
);

app.get("/health", (c) =>
  c.json({
    ok: true,
    service: "universal-backend",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  })
);

/* -------------------------------------------------------
   SAFE ENVIRONMENT CHECK
-------------------------------------------------------- */

app.get("/core/env", (c) => {
  return c.json({
    ok: true,
    environment: {
      NODE_ENV: process.env.NODE_ENV || "unknown",
      PORT: process.env.PORT || "unknown",
      DATABASE_URL: process.env.DATABASE_URL ? "set" : "missing",
      OS_ENV: process.env.OS_ENV ? "set" : "missing",
      LAFFLAB_FRONTEND_URL: process.env.LAFFLAB_FRONTEND_URL ? "set" : "missing",
      SESSION_COOKIE_NAME: process.env.SESSION_COOKIE_NAME ? "set" : "missing",
      JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN ? "set" : "missing",
    },
    timestamp: new Date().toISOString(),
  });
});

/* -------------------------------------------------------
   ROUTE-SPECIFIC HEALTH CHECKS
-------------------------------------------------------- */

app.get("/core/feed/health", (c) => c.json({ ok: true }));
app.get("/core/favorites/health", (c) => c.json({ ok: true }));
app.get("/core/history/health", (c) => c.json({ ok: true }));
app.get("/core/profile/health", (c) => c.json({ ok: true }));
app.get("/core/settings/health", (c) => c.json({ ok: true }));
app.get("/core/search/health", (c) => c.json({ ok: true }));
app.get("/core/reactions/health", (c) => c.json({ ok: true }));
app.get("/core/impressions/health", (c) => c.json({ ok: true }));
app.get("/core/os/health", (c) => c.json({ ok: true }));

/* -------------------------------------------------------
   ROUTE SUMMARY
-------------------------------------------------------- */

app.get("/core/routes", (c) =>
  c.json({
    routes: [
      "/core/login",
      "/core/sessions",
      "/core/user",
      "/core/feed",
      "/core/favorites",
      "/core/history",
      "/core/profile",
      "/core/settings",
      "/core/search",
      "/core/post",
      "/core/reactions",
      "/core/impressions",
      "/core/os",
      "/core/schema",
    ],
  })
);

/* -------------------------------------------------------
   IMPORT ROUTES (CORRECTED PATHS)
-------------------------------------------------------- */

import { universeMiddleware } from "./core/middleware/universe.middleware.js";
import { emotionalOSLogger } from "./core/middleware/os-logger.middleware.js";

import loginRoutes from "./core/routes/login.routes.js";
import sessionsRoutes from "./core/routes/sessions.routes.js";
import userRoutes from "./core/routes/user.routes.js";

import feedRoutes from "./core/routes/feed.routes.js";
import favoritesRoutes from "./core/routes/favorites.routes.js";
import historyRoutes from "./core/routes/history.routes.js";
import profileRoutes from "./core/routes/profile.routes.js";
import settingsRoutes from "./core/routes/settings.routes.js";
import searchRoutes from "./core/routes/search.routes.js";
import postRoutes from "./core/routes/post.routes.js";

import reactionsRoutes from "./core/crossapp/reactions.routes.js";
import impressionsRoutes from "./core/crossapp/impressions.routes.js";

import osRoutes from "./core/routes/os.routes.js";
import schemaRoutes from "./core/routes/schema.routes.js";

/* -------------------------------------------------------
   MIDDLEWARE
-------------------------------------------------------- */

app.use("*", universeMiddleware);
app.use("*", emotionalOSLogger);

/* -------------------------------------------------------
   MOUNT ROUTES
-------------------------------------------------------- */

app.route("/core/login", loginRoutes);
app.route("/core/sessions", sessionsRoutes);
app.route("/core/user", userRoutes);

app.route("/core/feed", feedRoutes);
app.route("/core/favorites", favoritesRoutes);
app.route("/core/history", historyRoutes);
app.route("/core/profile", profileRoutes);
app.route("/core/settings", settingsRoutes);
app.route("/core/search", searchRoutes);
app.route("/core/post", postRoutes);

app.route("/core/reactions", reactionsRoutes);
app.route("/core/impressions", impressionsRoutes);

app.route("/core/os", osRoutes);
app.route("/core/schema", schemaRoutes);

/* -------------------------------------------------------
   START SERVER
-------------------------------------------------------- */

const port = Number(process.env.PORT) || 3000;

serve({
  fetch: app.fetch,
  port,
});

console.log(`🚀 Universal Backend running on port ${port}`);
