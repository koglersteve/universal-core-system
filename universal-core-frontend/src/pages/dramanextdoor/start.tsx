"use client";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import { useMood } from "@/hooks/useMood";
import { useEmotionalIdentity } from "@/hooks/useEmotionalIdentity";
import { useEmotionalPhysics } from "@/hooks/useEmotionalPhysics";
import { useEmotionalMultiverse } from "@/hooks/useEmotionalMultiverse";
import { useCrossApp } from "@/hooks/useCrossApp";

import { runScene } from "@/lib/dramanextdoor/runScene";
import { scenes } from "@/lib/dramanextdoor/scenes";

export default function DramaNextDoorStart() {
  const router = useRouter();
  const token = router.query.token;

  // Emotional OS hooks
  const mood = useMood();
  const identity = useEmotionalIdentity();
  const physics = useEmotionalPhysics();
  const multiverse = useEmotionalMultiverse();
  const crossApp = useCrossApp();

  // Scene engine state
  const [currentSceneId, setCurrentSceneId] = useState("intro");
  const [currentBeatIndex, setCurrentBeatIndex] = useState(0);
  const [sceneOutput, setSceneOutput] = useState(null);

  // Build the emotional context for the scene engine
  const ctx = {
    mood: mood?.value ?? 50,
    tension: physics?.tension ?? 0,
    identityState: identity?.state ?? "stable",
    worldName: multiverse?.currentWorld?.name ?? "default",
  };

  // Run the scene when sceneId changes
  useEffect(() => {
    const result = runScene(currentSceneId, ctx);
    setSceneOutput(result);
    setCurrentBeatIndex(0);

    // Auto‑transition if a cross‑app route is triggered
    if (result?.crossApp) {
      crossApp.route(result.crossApp.appId, result.crossApp.payload || {});
    }
  }, [currentSceneId]);

  if (!sceneOutput) {
    return <div style={{ padding: "2rem", color: "#fff" }}>Loading scene…</div>;
  }

  const { scene, nextSceneId, updatedCtx } = sceneOutput;
  const beats = scene.beats;
  const currentBeat = beats[currentBeatIndex];

  function nextBeat() {
    if (currentBeatIndex < beats.length - 1) {
      setCurrentBeatIndex(currentBeatIndex + 1);
    } else {
      // End of scene → move to next scene (Hybrid Mode)
      if (nextSceneId) {
        setCurrentSceneId(nextSceneId);
      }
    }
  }

  return (
    <div style={{ padding: "2rem", color: "#fff", background: "#050509", minHeight: "100vh" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>DramaNextDoor</h1>
      <p style={{ opacity: 0.8, marginBottom: "1rem" }}>
        Token: <span style={{ fontFamily: "monospace" }}>{String(token ?? "")}</span>
      </p>

      <h2 style={{ marginBottom: "1rem" }}>{scene.title}</h2>

      <div
        style={{
          background: "#111",
          padding: "1rem",
          borderRadius: "8px",
          marginBottom: "1.5rem",
          fontSize: "1rem",
        }}
      >
        {currentBeat.text}
        {currentBeat.agent && (
          <div style={{ opacity: 0.6, marginTop: "0.5rem", fontSize: "0.85rem" }}>
            ({currentBeat.agent} agent)
          </div>
        )}
      </div>

      <button
        onClick={nextBeat}
        style={{
          padding: "0.6rem 1rem",
          background: "#1b1b22",
          borderRadius: "999px",
          border: "1px solid #333",
          color: "#fff",
          cursor: "pointer",
          marginBottom: "2rem",
        }}
      >
        Next
      </button>

      <h3 style={{ marginBottom: "0.5rem" }}>Emotional Engine Status</h3>
      <pre
        style={{
          background: "#111",
          padding: "1rem",
          borderRadius: "8px",
          fontSize: "0.85rem",
          overflowX: "auto",
        }}
      >
{JSON.stringify(updatedCtx, null, 2)}
      </pre>
    </div>
  );
}
