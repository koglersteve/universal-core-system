"use client";

import { computeMetrics } from "./adaptationMetrics";
import { computeOutputs } from "./adaptationOutputs";
import { AdaptationSignal, AdaptationEvent } from "./adaptationTypes";

export class AdaptationEngine {
  private listeners: ((event: AdaptationEvent) => void)[] = [];

  onEvent(listener: (event: AdaptationEvent) => void) {
    this.listeners.push(listener);
  }

  private emit(event: AdaptationEvent) {
    for (const listener of this.listeners) listener(event);
  }

  evaluate(signals: AdaptationSignal) {
    const metrics = computeMetrics(signals);
    const outputs = computeOutputs(metrics);

    this.emit({
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      metrics,
      outputs,
    });

    return { metrics, outputs };
  }
}
