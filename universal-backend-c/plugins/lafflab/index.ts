import { registerPlugin } from "../core/pluginRegistry";

import * as JokesRoutes from "./routes/jokes";
import * as FavoritesRoutes from "./routes/favorites";
import * as HistoryRoutes from "./routes/history";
import { registerPlugin } from "../../core/pluginRegistry";

// ROUTES
import * as JokesRoutes from "./routes/jokes";
import * as FavoritesRoutes from "./routes/favorites";
import * as HistoryRoutes from "./routes/history";
import * as CategoriesRoutes from "./routes/categories";
import * as EmotionRoutes from "./routes/emotions";
import * as CrossAppRoutes from "./routes/crossApp";
import * as PremiumRoutes from "./routes/premium";
import * as RitualRoutes from "./routes/ritual";
import * as AnalyticsRoutes from "./routes/analytics";
import * as CouplesRoutes from "./routes/couples";
import * as CommentsRoutes from "./routes/comments";
import * as ReactionsRoutes from "./routes/reactions";

// UI ENTRY
import { LaffLabHome } from "./ui/LaffLabHome";

export default registerPlugin({
  id: "lafflab",
  name: "LAFFlab",
  version: "1.0.0",

  routes: [
    JokesRoutes,
    FavoritesRoutes,
    HistoryRoutes,
    CategoriesRoutes,
    EmotionRoutes,
    CrossAppRoutes,
    PremiumRoutes,
    RitualRoutes,
    AnalyticsRoutes,
    CouplesRoutes,
    CommentsRoutes,
    ReactionsRoutes
  ],

  ui: {
    appEntry: LaffLabHome
  },

  features: {
    emotionalLinkEngine: true,
    crossAppLauncher: true,
    dailyLaughRitual: true,
    couplesMode: true,
    premium: true
  }
});
