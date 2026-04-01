import { makeAppTracker } from "./client";

export function createStabilityTracker(app: EmotionalAppId) {
  const track = makeAppTracker(app);

  const base = () => ({
    appVersion: window.__AURELIAQ_APP_VERSION__ ?? null,
    userId: window.__AURELIAQ_USER_ID__ ?? null,
    sessionId: window.__AURELIAQ_SESSION_ID__ ?? null,

    // emotional context (optional)
    mood: window.__AURELIAQ_LAST_MOOD_PACKET__?.mood ?? null,
    world: window.__AURELIAQ_ACTIVE_WORLD__ ?? null,
    trait: window.__AURELIAQ_ACTIVE_TRAIT__ ?? null,
    agent: window.__AURELIAQ_ACTIVE_AGENT__ ?? null,

    // environment
    deviceModel: navigator.userAgent,
    osVersion: navigator.platform,
    browser: navigator.userAgent,
    networkType: navigator.connection?.effectiveType ?? null,
    batteryPct: navigator.getBattery
      ? navigator.getBattery().then(b => b.level * 100)
      : null
  });

  return {
    download: (downloadTimeMs: number, installSuccess: boolean) =>
      track("download.metrics", {
        type: "download",
        payload: { downloadTimeMs, installSuccess },
        ...base()
      }),

    crash: (crashType: string, crashMessage?: string) =>
      track("crash.metrics", {
        type: "crash",
        payload: { crashType, crashMessage },
        ...base()
      }),

    freeze: (freezeDurationMs: number) =>
      track("freeze.metrics", {
        type: "freeze",
        payload: { freezeDurationMs },
        ...base()
      }),

    anr: () =>
      track("anr.metrics", {
        type: "anr",
        payload: { anrDetected: true },
        ...base()
      }),

    performance: (metrics: {
      ttiMs?: number;
      apiLatencyMs?: number;
      droppedFrames?: number;
      memoryUsageMb?: number;
      cpuUsagePct?: number;
    }) =>
      track("performance.metrics", {
        type: "performance",
        payload: metrics,
        ...base()
      }),

    stabilityScore: (score: number) =>
      track("stability.score", {
        type: "stability-score",
        payload: { stabilityScore: score },
        ...base()
      })
  };
}


