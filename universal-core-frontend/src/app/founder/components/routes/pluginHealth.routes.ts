// Frontend-safe route helpers for plugin health checks.

export const pluginHealthRoutes = {
  list: "/api/plugins/health",
  get: (pluginId: string) => `/api/plugins/health/${pluginId}`,
};
