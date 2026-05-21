// src/core/reactions/reaction-stream.ts

import { subscribe } from "../events/event-bus";
import { EVENT_TYPES } from "../events/event-types";
import type { LocalReactionEvent } from "./reaction-types";

export function createReactionStream(res: any) {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const send = (event: LocalReactionEvent) => {
    res.write(`data: ${JSON.stringify(event)}\n\n`);
  };

  // Subscribe to broadcast events
  subscribe(EVENT_TYPES.STREAM_BROADCAST, send);

  // Keep connection alive
  const interval = setInterval(() => res.write(":\n\n"), 15000);

  res.on("close", () => {
    clearInterval(interval);
  });
}
