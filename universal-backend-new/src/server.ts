import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { registerOSRoutes } from "./os/os.routes";
import { registerMultiverseRoutes } from "./os/multiverse.routes";
import { registerDramaNextDoorRoutes } from "./modules/routes/dramanextdoor.routes";
import { jokesRoute } from "./modules/routes/jokes";
import { historyRoute } from "./modules/routes/history";
import { corsMiddleware } from "./os/middleware/cors";
import { universeMiddleware } from "./os/middleware/universe";

const app = new Hono();

app.use("*", corsMiddleware);
app.use("*", universeMiddleware);

registerOSRoutes(app);
registerMultiverseRoutes(app);
registerDramaNextDoorRoutes(app);

app.route("/jokes", jokesRoute);
app.route("/history", historyRoute);

serve({
  fetch: app.fetch,
  port: Number(process.env.PORT) || 8080,
});
