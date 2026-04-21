"use client";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import { useMood } from "@/hooks/useMood";
import { useEmotionalIdentity } from "@/hooks/useEmotionalIdentity";
import { useEmotionalPhysics } from "@/hooks/useEmotionalPhysics";
import { useEmotionalMultiverse } from "@/hooks/useEmotionalMultiverse";
import { useCrossApp } from "@/hooks/useCrossApp";

import { runScene } from "@/lib/dramanextdoor/runScene";
import { getAgentMeta } from "@/lib/dramanextdoor/agents";
import { useRitualEngine } from "@/lib/dramanextdoor/useRitualEngine";

export default function DramaNextDoorStart() {
  const router = useRouter();
  const token = router.query.token;

  // Emotional OS hooks
  const mood = useMood();
  const identity = useEmotionalIdentity();
  const physics = useEmotionalPhysics();
  const multiverse = useEmotionalMultiverse();
  const crossApp = useCrossApp();

  // Ritual Engine
  const ritualEngine = useRitualEngine();

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

  // Agent metadata
  const agentMeta = getAgentMeta(currentBeat.agent);

  function nextBeat() {
    if (currentBeatIndex < beats.length - 1) {
      setCurrentBeatIndex(currentBeatIndex + 1);
    } else {
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

        {agentMeta && (
          <div
            style={{
              marginTop: "0.5rem",
              fontSize: "0.85rem",
              color: agentMeta.color,
              opacity: 0.9,
            }}
          >
            {agentMeta.name}:{" "}
            <span style={{ opacity: 0.75 }}>{agentMeta.description}</span>
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

      {/* Rituals Section */}
      <h3 style={{ marginBottom: "0.5rem" }}>Emotional Rituals</h3>

      <div style={{ marginBottom: "2rem" }}>
        {ritualEngine.rituals.map((r) => {
          const done = ritualEngine.completed[r.id];

          return (
            <div
              key={r.id}
              style={{
                marginBottom: "0.75rem",
                padding: "0.75rem",
                background: "#111",
                borderRadius: "8px",
                opacity: done ? 0.5 : 1,
              }}
            >
              <strong>{r.name}</strong>
              <div style={{ opacity: 0.8, marginBottom: "0.5rem" }}>{r.description}</div>

              {!done && (
                <button
                  onClick={() => ritualEngine.completeRitual(r.id)}
                  style={{
                    padding: "0.4rem 0.8rem",
                    background: "#1b1b22",
                    borderRadius: "999px",
                    border: "1px solid #333",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  Complete Ritual
                </button>
              )}

              {done && (
                <div style={{ color: "#7dd3fc", fontSize: "0.85rem" }}>
                  Ritual completed
                </div>
              )}
            </div>
          );
        })}
      </div>

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
