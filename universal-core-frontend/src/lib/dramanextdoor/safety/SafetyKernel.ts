"use client";

import { SafetyRule, SafetySignal, SafetyEvent } from "./safetyTypes";
import { safetyRules } from "./safetyRules";

export class SafetyKernel {
  private rules: SafetyRule[];
  private listeners: ((event: SafetyEvent) => void)[] = [];

  constructor(rules: SafetyRule[] = safetyRules) {
    this.rules = rules;
  }

  // Subscribe UI or engines to safety events
  onEvent(listener: (event: SafetyEvent) => void) {
    this.listeners.push(listener);
  }

  // Emit event to all listeners
  private emit(event: SafetyEvent) {
    for (const listener of this.listeners) {
      listener(event);
    }
  }

  // Evaluate all rules against incoming signals
  evaluate(signals: SafetySignal) {
    for (const rule of this.rules) {
      const result = rule(signals);
      if (result) {
        this.emit(result);
      }
    }
  }
}
