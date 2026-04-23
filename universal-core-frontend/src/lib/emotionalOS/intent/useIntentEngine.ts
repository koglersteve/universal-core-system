"use client";

import { useEffect, useState } from "react";
import { IntentEngine } from "./IntentEngine";
import { buildIntentSignal } from "./intentSignals";

const engine = new IntentEngine();

export function useIntentEngine(rawSignals: any) {
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const signal = buildIntentSignal(rawSignals);
    const result = engine.evaluate(signal);
    setEvent(result);
  }, [JSON.stringify(rawSignals)]);

  return event;
}
