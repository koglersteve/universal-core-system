// src/app/mememycat/layout.tsx
import React from "react";

export default function MemeMyCatLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mememycat-layout">
      <StabilityWatchdog />
      {children}
    </div>
  );
}

// --- client-only watchdog ---
"use client";

import { useEffect } from "react";

function StabilityWatchdog() {
  useEffect(() => {
    let last = performance.now();

    const interval = setInterval(() => {
      const now = performance.now();
      const delta = now - last;

      if (delta > 2000) {
        stability.freeze(delta);
        if (delta > 5000) stability.anr();
      }

      last = now;
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return null;
}
