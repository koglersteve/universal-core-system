"use client";

import { useEffect, useState } from "react";

export default function EmotionalOSOverview() {
  const [stability, setStability] = useState(null);
  const [plugins, setPlugins] = useState([]);
  const [physics, setPhysics] = useState([]);
  const [narrative, setNarrative] = useState([]);
  const [streamEvents, setStreamEvents] = useState([]);

  // Load all analytics layers
  useEffect(() => {
    async function load() {
      const s = await fetch("/api/analytics/stability").then(r => r.json());
      const p = await fetch("/api/plugins/health").then(r => r.json());
      const ph = await fetch("/api/analytics/physics").then(r => r.json());
      const n = await fetch("/api/analytics/narrative").then(r => r.json());

      setStability(s);
      setPlugins(p.plugins ?? []);
      setPhysics(ph.events ?? []);
      setNarrative(n.scenes ?? []);
    }
    load();
  }, []);

  // Real-time emotional telemetry
  useEffect(() => {
    const sse = new EventSource("/api/analytics/stream");

    sse.onmessage = (msg) => {
      try {
        const data = JSON.parse(msg.data);
        setStreamEvents(prev => [...prev, data]);
      } catch {}
    };

    return () => sse.close();
  }, []);

  return (
    <div className="console-section">
      <h1>Emotional OS Overview</h1>
      <p>The unified mission control for your entire Emotional OS.</p>

      {/* Stability Score */}
      {stability?.stabilityScore !== undefined && (
        <div className="overview-card">
          <h2>Stability Score</h2>
          <p className="big-score">
            {(stability.stabilityScore * 100).toFixed(1)}%
          </p>
        </div>
      )}

      {/* Plugin Health Summary */}
      <div className="overview-card">
        <h2>Plugin Health</h2>
        <p>{plugins.length} plugins monitored</p>
        <ul>
          {plugins.map((p, i) => (
            <li key={i}>
              {p.name}: {p.status} ({p.latencyMs}ms)
            </li>
          ))}
        </ul>
      </div>

      {/* Emotional Physics Snapshot */}
      <div className="overview-card">
        <h2>Emotional Physics Snapshot</h2>
        {physics.slice(0, 5).map((p, i) => (
          <div key={i}>
            <strong>World {p.world}</strong> — momentum {p.momentum}, friction {p.friction}
          </div>
        ))}
      </div>

      {/* Narrative Snapshot */}
      <div className="overview-card">
        <h2>Narrative Snapshot</h2>
        {narrative.slice(0, 5).map((s, i) => (
          <div key={i}>
            <strong>{s.sceneType}</strong> — tension {s.tension}, branches {s.branchCount}
          </div>
        ))}
      </div>

      {/* Real-Time Emotional Telemetry */}
      <div className="overview-card">
        <h2>Real-Time Emotional Telemetry</h2>
        <pre>{JSON.stringify(streamEvents.slice(-10), null, 2)}</pre>
      </div>
    </div>
  );
}
