// src/lib/analytics.ts

export const Analytics = {
  pageview: (path: string) => {
    if (process.env.NEXT_PUBLIC_ANALYTICS !== "enabled") return;

    fetch("/api/analytics/pageview", {
      method: "POST",
      body: JSON.stringify({ path, ts: Date.now() }),
      headers: { "Content-Type": "application/json" },
    }).catch(() => {});
  },

  event: (name: string, data: Record<string, any> = {}) => {
    if (process.env.NEXT_PUBLIC_ANALYTICS !== "enabled") return;

    fetch("/api/analytics/event", {
      method: "POST",
      body: JSON.stringify({ name, data, ts: Date.now() }),
      headers: { "Content-Type": "application/json" },
    }).catch(() => {});
  },
};
