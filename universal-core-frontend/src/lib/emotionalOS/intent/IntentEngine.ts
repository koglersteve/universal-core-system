"use client";

import { classifyIntent } from "./intentClassifier";
import { projectIntent } from "./intentProjection";
import { IntentSignal, IntentEvent } from "./intentTypes";

export class IntentEngine {
  private listeners: ((event: IntentEvent) => void)[] = [];

  onEvent(listener: (event: IntentEvent) => void) {
    this.listeners.push(listener);
  }

  private emit(event: IntentEvent) {
    for (const l of this.listeners) l(event);
  }

  evaluate(signal: IntentSignal) {
    const intent = classifyIntent(signal);
    const projection = projectIntent(intent);

    const event: IntentEvent = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      intent,
      projection,
    };

    this.emit(event);
    return event;
  }
}
