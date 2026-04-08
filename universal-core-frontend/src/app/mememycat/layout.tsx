"use client";

import React, { useEffect } from "react";

export default function MemeMyCatLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mememycat-layout">
      <StabilityWatchdog />
      {children}
    </div>
  );
}

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

