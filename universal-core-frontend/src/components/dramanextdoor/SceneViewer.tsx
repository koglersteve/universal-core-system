"use client";

import { FC } from "react";
import { getAgentMeta } from "@/lib/dramanextdoor/agents";

interface SceneViewerProps {
  scene: any;
  currentBeatIndex: number;
  onNextBeat: () => void;
  token: string | null;
}

export const SceneViewer: FC<SceneViewerProps> = ({
  scene,
  currentBeatIndex,
  onNextBeat,
  token,
}) => {
  const beats = scene.beats || [];
  const currentBeat = beats[currentBeatIndex] || beats[0];
  const agentMeta = currentBeat ? getAgentMeta(currentBeat.agent) : null;

  return (
    <>
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
        {currentBeat?.text}

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
        onClick={onNextBeat}
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
    </>
  );
};
