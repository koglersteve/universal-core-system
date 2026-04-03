"use client";

/**
 * Lightweight frontend analytics client.
 * Sends events to your backend's analytics endpoint.
 */

export interface AnalyticsEvent {
  app?: string;
  type: string;
  payload?: any;
  ts?: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Fire‑and‑forget analytics event sender.
 */
export async function trackEvent(event: AnalyticsEvent) {
  try {
    if (!API_URL) {
      console.warn("Missing NEXT_PUBLIC_API_URL — analytics disabled.");
      return;
    }

    const body = {
      ...event,
      ts: Date.now()
    };

    await fetch(`${API_URL}/analytics/event`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store"
    });
  } catch (err) {
    // Never block UI
    console.warn("Analytics event failed:", err);
  }
}

/**
 * Helper to create per‑app trackers.
 * Example:
 *   const trackFounder = makeAppTracker("founder");
 *   trackFounder("page.opened", { section: "dashboard" });
 */
export function makeAppTracker(app: string) {
  return (type: string, payload?: any) =>
    trackEvent({ app, type, payload });
}
