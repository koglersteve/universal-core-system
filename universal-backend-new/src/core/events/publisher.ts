// src/core/events/publisher.ts

import { publish } from "./event-bus";
import type { EventType } from "./event-types";

export function publishEvent(event: EventType, payload: any) {
  publish(event, payload);
}
