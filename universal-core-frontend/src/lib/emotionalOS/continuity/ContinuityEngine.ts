"use client";

import { ContinuitySignal, ContinuityEvent } from "./continuityTypes";
import { ContinuityStore } from "./continuityStore";

const store = new ContinuityStore();

export class ContinuityEngine {
  private listeners: ((event: ContinuityEvent) => void)[] = [];

  onEvent(listener: (event: ContinuityEvent) => void) {
    this.listeners.push(listener);
  }

  private emit(event: ContinuityEvent) {
    for (const l of this.listeners) l(event);
  }

  record(signal: ContinuitySignal) {
    const snapshot = {
      timestamp: Date.now(),
      mood: signal.mood,
      tension: signal.tension,
      worldName: signal.worldName,
      reactionSignature: signal.reactionSignature,
      volatility: signal.volatility,
    };

    store.addSnapshot(snapshot);

    const state = store.getState();

    const event: ContinuityEvent = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      state,
    };

    this.emit(event);
    return state;
  }
}
