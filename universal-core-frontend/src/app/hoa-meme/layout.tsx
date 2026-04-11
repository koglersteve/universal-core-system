"use client";

import { useEffect } from "react";
import { createStabilityTracker } from "@/lib/analytics/stability";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const stability = createStabilityTracker("hoa-meme");

  useEffect(() => {
    let last = performance.now();

    const interval = setInterval(() => {
      const now = performance.now();
      const delta = now - last;

      // Freeze detection (> 2s)
      if (delta > 2000) {
        stability.freeze(delta);

        // ANR detection (> 5s)
        if (delta > 5000) {
          stability.anr();
        }
      }

      last = now;
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <>{children}</>;
}
