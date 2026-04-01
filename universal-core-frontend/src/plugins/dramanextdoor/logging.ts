// src/plugins/dramanextdoor/logging.ts
import { makeAppTracker } from "@/lib/analytics/client";

const trackDrama = makeAppTracker("dramanextdoor");

export async function logDramaAnalytics(event: {
  mood?: string;
  world?: string;
  trait?: string;
  agent?: string;
  sceneType: string;

  // optional emotional OS metadata
  momentum?: number;
  worldId?: string;
  vector?: Record<string, number>;
}) {
  trackDrama("scene.generated", {
    mood: event.mood,
    world: event.world,
    trait: event.trait,
    agent: event.agent,

    // emotional physics
    physicsMomentum: event.momentum,

    // multiverse
    worldId: event.worldId,

    // emotional vector
    vector: event.vector,

    // app-specific payload
    payload: {
      sceneType: event.sceneType
    }
  });
}
