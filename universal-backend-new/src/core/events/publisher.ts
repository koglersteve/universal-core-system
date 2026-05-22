// src/core/events/publisher.ts

import { publish } from "./event-bus.js";
import type { EventType } from "./event-types.js";

export function publishEvent(event: EventType | string, payload: any) {
  publish(event, payload);
}
