// src/core/events/subscriber.ts

import { subscribe } from "./event-bus";
import type { EventType } from "./event-types";

export function onEvent(event: EventType, handler: (payload: any) => void | Promise<void>) {
  subscribe(event, handler);
}
