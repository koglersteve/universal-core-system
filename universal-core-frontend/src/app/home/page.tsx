"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { decodeEmotionalState } from "@/lib/emotionalExportToken";

export const dynamic = "force-dynamic";

function HomePageInner() {
  const params = useSearchParams();

  const mood = params.get("mood") || undefined;
  const world = params.get("world") || undefined;
  const trait = params.get("trait") || undefined;
  const agent = params.get("agent") || undefined;

  const token = params.get("et");
  let emotionalState = null;

  if (token) {
    try {
      emotionalState = decodeEmotionalState(token);
    } catch (e) {
      console.warn("Invalid emotional token", e);
    }
  }

  useEffect(() => {
    const start = performance.now();
    return () => {
      const end = performance.now();
      stability.download(end - start, true);
    };
  }, []);

  return (
    <main className="home-landing">
      <h1 className="home-title">Welcome to Emotional‑OS</h1>
      <p className="home-subtitle">Select an app from the navigation to begin.</p>

      <pre style={{ whiteSpace: "pre-wrap", marginTop: "2rem" }}>
        {JSON.stringify(
          { mood, world, trait, agent, emotionalState },
          null,
          2
        )}
      </pre>
    </main>
  );
}

export default function HomePage() {
  return (
    <Suspense>
      <HomePageInner />
    </Suspense>
  );
}
