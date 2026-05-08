// lafflab-frontend/src/lib/analytics.ts

export interface AnalyticsInterface {
  track(event: string, data?: Record<string, any>): void;
  pageview(path: string): void;
}

export const Analytics: AnalyticsInterface = {
  track(event: string, data: Record<string, any> = {}) {
    console.log("[Analytics]", event, data);
  },

  pageview(path: string) {
    console.log("[Pageview]", path);
  },
};

export async function recordImpression(data: {
  postId: string;
  surface: string;
  userId?: string;
}) {
  console.log("[Impression Recorded]", data);

  return {
    ok: true,
    received: data,
  };
}


