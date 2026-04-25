"use client";

import { useEffect } from "react";

export default function MemeMyDogLayout({ children }) {
  const stability = createStabilityTracker("mememydog");

  useEffect(() => {
    let last = performance.now();

    const interval = setInterval(() => {
      const now = performance.now();
      const delta = now - last;

      // Freeze detection
      if (delta > 2000) {
        stability.freeze(delta);

        // ANR detection
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
