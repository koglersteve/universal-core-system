import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { registerOSRoutes } from "./os/os.routes";
import { registerMultiverseRoutes } from "./os/multiverse.routes";
import { dramaNextDoorRoute } from "./modules/routes/dramanextdoor.routes";
import { jokesRoute } from "./modules/routes/jokes";
import { historyRoute } from "./modules/routes/history";
import { favoritesRoute } from "./modules/routes/favorites.routes";
import { corsMiddleware } from "./os/middleware/cors";
import { universeMiddleware } from "./os/middleware/universe";

const app = new Hono();

app.use("*", corsMiddleware);
app.use("*", universeMiddleware);

registerOSRoutes(app);
registerMultiverseRoutes(app);

app.route("/api/dramanextdoor", dramaNextDoorRoute);
app.route("/jokes", jokesRoute);
app.route("/history", historyRoute);
app.route("/favorites", favoritesRoute);

serve({
  fetch: app.fetch,
  port: Number(process.env.PORT) || 8080,
});
