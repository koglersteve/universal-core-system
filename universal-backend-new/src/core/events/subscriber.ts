// src/core/events/subscriber.ts

import { subscribe } from "./event-bus.js";
import type { EventType } from "./event-types.js";

export function onEvent(
  event: EventType | string,
  handler: (payload: any) => void | Promise<void>,
) {
  subscribe(event, handler);
}
