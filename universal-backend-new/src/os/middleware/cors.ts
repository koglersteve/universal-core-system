// src/os/middleware/cors.ts
import { cors } from "hono/cors";
import { config } from "../../core/config/config";

export const corsMiddleware = cors({
  origin: config.cors.origin,
});
