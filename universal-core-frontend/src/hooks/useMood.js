"use client";

import { useState, useEffect, useCallback } from "react";

export function useMood() {
  const getLatest = useCallback(() => {
    if (typeof window === "undefined") return null;
    return window.__AURELIAQ_LAST_MOOD_PACKET__ || null;
  }, []);

  const [mood, setMood] = useState(getLatest);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const interval = setInterval(() => {
      const latest = getLatest();
      setMood(latest);
    }, 500);

    return () => clearInterval(interval);
  }, [getLatest]);

  return {
    raw: mood,
    mood: mood?.mood ?? null,
    intensity: mood?.intensity ?? null,
    sourceApp: mood?.sourceApp ?? null,
    timestamp: mood?.timestamp ?? null,
    userId: mood?.userId ?? null
  };
}


