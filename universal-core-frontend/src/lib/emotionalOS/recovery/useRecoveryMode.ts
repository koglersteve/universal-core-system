"use client";

import { useEffect, useState } from "react";
import { useEmotionalOS } from "@/app/EmotionalOSProvider";

export type RecoveryMode =
  | "normal"
  | "stabilize"
  | "safe"
  | "low-volatility"
  | "high-comfort";

export function useRecoveryMode() {
  const { state } = useEmotionalOS();
  const [mode, setMode] = useState<RecoveryMode>("normal");

  useEffect(() => {
    const { tension, volatility, lastIntentCategory } = state;

    // Stabilize Mode
    if (volatility > 80 || tension > 80) {
      setMode("stabilize");
      return;
    }

    // Safe Mode
    if (lastIntentCategory === "chaos" && volatility > 60) {
      setMode("safe");
      return;
    }

    // Low Volatility Mode
    if (volatility > 50 && volatility < 70) {
      setMode("low-volatility");
      return;
    }

    // High Comfort Mode
    if (tension < 20 && volatility < 20) {
      setMode("high-comfort");
      return;
    }

    setMode("normal");
  }, [state]);

  return mode;
}
