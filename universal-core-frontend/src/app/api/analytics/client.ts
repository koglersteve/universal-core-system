// src/lib/analytics/client.ts
import type { EmotionalEvent, EmotionalAppId } from "./schema";

export async function trackEmotionalEvent(
  event: Omit<EmotionalEvent, "ts">
) {
  const payload: EmotionalEvent = {
    ...event,
    ts: Date.now()
  };

  try {
    await fetch("/api/analytics/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
  } catch {
    // never block UX
  }
}

export function makeAppTracker(app: EmotionalAppId) {
  return (type: string, data: Partial<EmotionalEvent> = {}) =>
    trackEmotionalEvent({
      app,
      type,
      ...data
    });
}
