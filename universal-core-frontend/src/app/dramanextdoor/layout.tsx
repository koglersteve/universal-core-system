// src/app/dramanextdoor/layout.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { decodeEmotionalState } from "@/lib/emotionalExportToken";

export default function DramaNextDoorLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const params = useSearchParams();
  const token = params.get("et");

  let themeClass = "dramanextdoor-layout";

  if (token) {
    try {
      const state = decodeEmotionalState(token);
      const world = state?.multiverse?.activeWorldId;
      const trait = state?.identity?.dominantTrait;

      if (world) themeClass += ` world-${world}`;
      if (trait) themeClass += ` trait-${trait}`;
    } catch {
      // ignore
    }
  }

  return <div className={themeClass}>{children}</div>;
}
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
