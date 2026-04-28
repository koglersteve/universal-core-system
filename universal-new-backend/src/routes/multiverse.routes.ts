import { Hono } from "hono";
import { multiverse } from "../os/multiverse";

export const registerMultiverseRoutes = (app: Hono) => {
  app.route("/multiverse", multiverse);
};
