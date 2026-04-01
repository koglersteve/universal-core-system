// src/lib/analytics/storage.ts
import type { EmotionalEvent } from "./schema";

const QUEUE_KEY = "emotional-os:event-queue";

function loadQueue(): EmotionalEvent[] {
  try {
    return JSON.parse(localStorage.getItem(QUEUE_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveQueue(queue: EmotionalEvent[]) {
  localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
}

async function flushQueue() {
  const queue = loadQueue();
  if (queue.length === 0) return;

  if (!process.env.ANALYTICS_ENDPOINT) return;

  try {
    await fetch(process.env.ANALYTICS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(queue)
    });

    saveQueue([]); // clear on success
  } catch {
    // keep queue for retry
  }
}

export async function persistEvent(event: EmotionalEvent) {
  // Attach metadata
  const enriched = {
    ...event,
    sessionId: window.__AURELIAQ_SESSION_ID__ ?? null,
    userId: window.__AURELIAQ_USER_ID__ ?? null,
    appVersion: window.__AURELIAQ_APP_VERSION__ ?? null,
    device: navigator.userAgent,
    network: navigator.connection?.effectiveType ?? null
  };

  // Dev logging
  if (process.env.NODE_ENV === "development") {
    console.log("[EmotionalEvent]", enriched);
  }

  // If no endpoint, store locally
  if (!process.env.ANALYTICS_ENDPOINT) {
    const queue = loadQueue();
    queue.push(enriched);
    saveQueue(queue);
    return;
  }

  // Try sending immediately
  try {
    await fetch(process.env.ANALYTICS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(enriched)
    });
  } catch {
    // On failure, queue for retry
    const queue = loadQueue();
    queue.push(enriched);
    saveQueue(queue);
  }

  // Opportunistic flush
  flushQueue();
}

