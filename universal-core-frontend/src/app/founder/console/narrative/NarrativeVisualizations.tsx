"use client";

import { useEffect, useState } from "react";

export default function NarrativeVisualizations() {
  const [scenes, setScenes] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/analytics/narrative");
      const data = await res.json();
      setScenes(data.scenes ?? []);
    }
    load();
  }, []);

  return (
    <div className="console-section">
      <h2>Narrative Analytics Visualizations</h2>

      <div className="narrative-grid">
        {scenes.map((s, i) => (
          <div key={i} className="narrative-card">
            <h3>{s.sceneType}</h3>
            <p>Tension: {s.tension}</p>
            <p>Branching: {s.branchCount}</p>
            <p>Agent Influence: {s.agentInfluence}</p>
            <p>World: {s.world}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
