import { Hono } from "hono";
import { multiverse } from "../core/os/multiverse";

export const registerMultiverseRoutes = (app: Hono) => {
  app.route("/multiverse", multiverse);
};
