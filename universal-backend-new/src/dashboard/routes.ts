import type { Hono } from "hono";
import { dashboardAggregator } from "./aggregator";

export function registerDashboardRoutes(app: Hono) {
  app.get("/os/dashboard/state", async (c) => {
    await dashboardAggregator.refresh();
    return c.json(dashboardAggregator.getState());
  });
}
