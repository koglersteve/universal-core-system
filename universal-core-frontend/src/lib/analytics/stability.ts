"use client";

export function createStabilityTracker(page: string) {
  return {
    download(duration: number, success: boolean) {
      try {
        console.log("[stability]", {
          page,
          duration,
          success,
          timestamp: Date.now(),
        });
      } catch (e) {
        console.warn("Stability tracker error:", e);
      }
    },
  };
}


