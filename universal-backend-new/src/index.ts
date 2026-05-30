// src/index.ts
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

// Cross-app emotional engine routes (in crossapp/os)
import reactionsRoutes from "@/core/crossapp/reactions.routes.js";
import impressionsRoutes from "@/core/crossapp/impressions.routes.js";

// Emotional OS Dashboard route
import osRoutes from "@/core/routes/os.routes.js";

const app = new Hono();

// Universe context
app.use("*", universeMiddleware);

// Emotional OS logging
app.use("*", emotionalOSLogger);

// Core universal routes
app.route("/core/feed", feedRoutes);
app.route("/core/favorites", favoritesRoutes);
app.route("/core/history", historyRoutes);
app.route("/core/profile", profileRoutes);
app.route("/core/settings", settingsRoutes);
app.route("/core/search", searchRoutes);

// Cross-app emotional engine routes
app.route("/core/reactions", reactionsRoutes);
app.route("/core/impressions", impressionsRoutes);

// Emotional OS Dashboard
app.route("/core/os", osRoutes);

export default app;
