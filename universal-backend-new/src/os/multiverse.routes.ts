import { Hono } from "hono";
import { multiverse } from "./multiverse";

export const registerMultiverseRoutes = (app) => {
  app.route("/multiverse", multiverse);
};
