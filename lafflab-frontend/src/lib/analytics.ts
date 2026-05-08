// lafflab-frontend/src/lib/analytics.ts

export const Analytics = {
  track(event: string, data: Record<string, any> = {}) {
    console.log("[Analytics]", event, data);
  },
};

export async function recordImpression(data: {
  postId: string;
  surface: string;
  userId?: string;
}) {
  // Placeholder implementation until backend is wired
  console.log("[Impression Recorded]", data);

  return {
    ok: true,
    received: data,
  };
}


