import { Hono } from "hono";

// Core middleware
import { universeMiddleware } from "@/core/middleware/universe.middleware";
import { emotionalOSLogger } from "@/core/middleware/os-logger.middleware";

// Core universal routes
import feedRoutes from "@/core/routes/feed.routes";
import favoritesRoutes from "@/core/routes/favorites.routes";
import historyRoutes from "@/core/routes/history.routes";
import profileRoutes from "@/core/routes/profile.routes";
import settingsRoutes from "@/core/routes/settings.routes";
import searchRoutes from "@/core/routes/search.routes";

// Cross-app emotional engine routes
import reactionsRoutes from "@/core/routes/reactions.routes";
import impressionsRoutes from "@/core/routes/impressions.routes";

// Emotional OS Dashboard route
import osRoutes from "@/core/routes/os.routes";

const app = new Hono();

// ⭐ Universe context FIRST
app.use("*", universeMiddleware);

// ⭐ Emotional OS Logging SECOND
app.use("*", emotionalOSLogger);

// ⭐ Core universal routes
app.route("/core/feed", feedRoutes);
app.route("/core/favorites", favoritesRoutes);
app.route("/core/history", historyRoutes);
app.route("/core/profile", profileRoutes);
app.route("/core/settings", settingsRoutes);
app.route("/core/search", searchRoutes);

// ⭐ Cross-app emotional engine routes
app.route("/core/reactions", reactionsRoutes);
app.route("/core/impressions", impressionsRoutes);

// ⭐ Emotional OS Dashboard
app.route("/core/os", osRoutes);

export default app;
