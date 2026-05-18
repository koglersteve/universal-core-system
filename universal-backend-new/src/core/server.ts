import { Hono } from "hono";
import feedRoute from "./routes/feed";
import profileRoute from "./routes/profile.routes";
import postRoute from "./routes/post.routes";
import lafflabRoute from "./routes/lafflab.routes";

export function registerCoreRoutes(app: Hono) {
  app.route("/core/feed", feedRoute);
  app.route("/core/profile", profileRoute);
  app.route("/core/posts", postRoute);
  app.route("/core/lafflab", lafflabRoute);
}

