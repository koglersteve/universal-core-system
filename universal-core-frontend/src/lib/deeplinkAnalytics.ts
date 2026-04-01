// src/lib/deeplinkAnalytics.ts

export async function trackDeeplink(event: {
  app: string;
  mood?: string | null;
  worldId?: string | null;
  source?: string | null;
}) {
  const enriched = {
    ...event,
    ts: Date.now(),

    // identity + session
    userId: window.__AURELIAQ_USER_ID__ ?? null,
    sessionId: window.__AURELIAQ_SESSION_ID__ ?? null,

    // emotional context
    trait: window.__AURELIAQ_ACTIVE_TRAIT__ ?? null,
    agent: window.__AURELIAQ_ACTIVE_AGENT__ ?? null,

    // environment
    device: navigator.userAgent,
    network: navigator.connection?.effectiveType ?? null,

    // app version
    appVersion: window.__AURELIAQ_APP_VERSION__ ?? null
  };

  try {
    await fetch("/api/analytics/deeplink", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(enriched)
    });
  } catch (err) {
    // fire-and-forget, never block routing
    if (process.env.NODE_ENV === "development") {
      console.warn("[deeplinkAnalytics] failed:", err);
    }
  }
}
