"use client";

import { useEffect, useState } from "react";

export function useSmoothedSignal(
  rawValue: number,
  { momentum = 0.8, damping = 0.6, hysteresis = 1 }
) {
  const [value, setValue] = useState(rawValue);

  useEffect(() => {
    setValue(prev => {
      const delta = rawValue - prev;

      // ignore tiny noise
      if (Math.abs(delta) < hysteresis) return prev;

      // reduce spikes
      const damped = delta * damping;

      // blend past + present
      const next = prev * momentum + (prev + damped) * (1 - momentum);

      return next;
    });
  }, [rawValue, momentum, damping, hysteresis]);

  return value;
}
