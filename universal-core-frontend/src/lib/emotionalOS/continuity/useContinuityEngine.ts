"use client";

import { useEffect, useState } from "react";
import { ContinuityEngine } from "./ContinuityEngine";
import { buildContinuitySignal } from "./continuitySignals";

const engine = new ContinuityEngine();

export function useContinuityEngine(rawSignals: any) {
  const [state, setState] = useState(null);

  useEffect(() => {
    const signal = buildContinuitySignal(rawSignals);
    const newState = engine.record(signal);
    setState(newState);
  }, [JSON.stringify(rawSignals)]);

  return state;
}
