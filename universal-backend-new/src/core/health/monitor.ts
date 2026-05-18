import { healthChecks } from "./checks.js";
import type { HealthStatus } from "./types.js";

export async function monitorHealth(c: any) {
  const checks = await healthChecks();
  return c.json(checks);
}

export function registerHealthRoutes(app: any) {
  app.get("/health", (c: any) => monitorHealth(c));
}
