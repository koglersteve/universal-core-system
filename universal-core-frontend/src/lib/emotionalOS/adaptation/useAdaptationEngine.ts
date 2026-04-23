"use client";

import { useEffect, useState } from "react";
import { AdaptationEngine } from "./AdaptationEngine";

const engine = new AdaptationEngine();

export function useAdaptationEngine(signals) {
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const result = engine.evaluate(signals);
    setEvent(result);
  }, [JSON.stringify(signals)]);

  return event;
}
