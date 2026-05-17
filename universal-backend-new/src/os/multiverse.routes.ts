import { Hono } from "hono";
import { multiverse } from "./multiverse";

export const registerMultiverseRoutes = (app: Hono) => {
  app.route("/multiverse", multiverse);
};
