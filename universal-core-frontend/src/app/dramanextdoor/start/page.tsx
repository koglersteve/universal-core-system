"use client";

import { useEffect, useState } from "react";

// Emotional OS
import { useEmotionalState } from "@/hooks/useEmotionalState";
import { useIdentityState } from "@/hooks/useIdentityState";
import { useTension } from "@/hooks/useTension";

// Drama Engine
import { useDramaEngine } from "@/lib/dramanextdoor/useDramaEngine";

// UI Components
import LoadingSpinner from "@/components/LoadingSpinner";
import Scene from "@/components/dramanextdoor/Scene";
import Next from "@/components/dramanextdoor/Next";
import Feed from "@/components/dramanextdoor/Feed";
import State from "@/components/dramanextdoor/State";

export default function DramaNextDoorStart() {
  const { emotion, setEmotion } = useEmotionalState();
  const { identity } = useIdentityState();
  const { tension, increaseTension, decreaseTension } = useTension();

  const {
    scene,
    feed,
    loading,
    error,
    initializeDrama,
    nextScene,
  } = useDramaEngine();

  const [ready, setReady] = useState(false);

  // Boot the Drama Engine once identity + emotional OS are ready
  useEffect(() => {
    if (!identity) return;

    initializeDrama(identity);
    setReady(true);
  }, [identity, initializeDrama]);

  if (!ready || loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner label="Loading Drama…" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-500">
        <h2 className="text-xl font-semibold mb-2">Drama Failed to Load</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      {/* Current Scene */}
      <Scene scene={scene} />

      {/* Emotional + Tension State */}
      <State emotion={emotion} tension={tension} />

      {/* Next Scene Button */}
      <Next onNext={nextScene} />

      {/* Drama Feed */}
      <Feed items={feed} />
    </div>
  );
}
