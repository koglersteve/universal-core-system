import { useState } from "react";

export function useWorldTransition() {
  const [isTransitioning, setIsTransitioning] = useState(false);

  function startTransition(callback: () => void) {
    setIsTransitioning(true);

    setTimeout(() => {
      callback();
      setIsTransitioning(false);
    }, 600); // 600ms cinematic fade
  }

  return {
    isTransitioning,
    startTransition,
  };
}
