"use client";

import { useEffect, useState } from "react";

export default function StabilityDashboard() {
  const [events, setEvents] = useState([]);
  const [score, setScore] = useState<number | null>(null);

  // Load historical stability data
  useEffect(() => {
    async function load() {
      const res = await fetch("/api/analytics/stability");
      const data = await res.json();
      setEvents(data.events);
      setScore(data.stabilityScore);
    }
    load();
  }, []);

  // Realtime SSE stream
  useEffect(() => {
    const sse = new EventSource("/api/analytics/stream");

    sse.onmessage = (msg) => {
      try {
        const data = JSON.parse(msg.data);
        setEvents((prev) => [...prev, data]);
      } catch {
        // ignore malformed events
      }
    };

    return () => sse.close();
  }, []);

  return (
    <div className="stability-dashboard">
      <h1>Emotional OS Stability Dashboard</h1>

      {score !== null && (
        <div className="stability-score">
          Stability Score: <strong>{(score * 100).toFixed(1)}%</strong>
        </div>
      )}

      <div className="metrics-grid">
        <MetricCard title="Crashes" value={count(events, "crash.metrics")} />
        <MetricCard title="Freezes" value={count(events, "freeze.metrics")} />
        <MetricCard title="ANRs" value={count(events, "anr.metrics")} />
        <MetricCard title="Avg API Latency" value={avg(events, "apiLatencyMs")} />
        <MetricCard title="Dropped Frames" value={avg(events, "droppedFrames")} />
        <MetricCard title="Memory Usage" value={avg(events, "memoryUsageMb")} />
      </div>

      <Heatmap events={events} />
    </div>
  );
}

function MetricCard({ title, value }) {
  return (
    <div className="metric-card">
      <h3>{title}</h3>
      <p>{value ?? "—"}</p>
    </div>
  );
}

function count(events, type) {
  return events.filter((e) => e.type === type).length;
}

function avg(events, field) {
  const values = events
    .map((e) => e.payload?.[field])
    .filter((v) => typeof v === "number");

  if (!values.length) return "—";

  return Math.round(values.reduce((a, b) => a + b, 0) / values.length);
}

function Heatmap({ events }) {
  return (
    <div className="heatmap">
      <h2>Stability Heatmap</h2>
      <p>App × World × Mood × Trait × Agent</p>

      <div className="heatmap-grid">
        {events.map((e, i) => (
          <div key={i} className="heatmap-cell">
            <strong>{e.app}</strong>
            <div>World: {e.world ?? "—"}</div>
            <div>Mood: {e.mood ?? "—"}</div>
            <div>Trait: {e.trait ?? "—"}</div>
            <div>Agent: {e.agent ?? "—"}</div>
            <div>Score: {e.payload?.stabilityScore ?? "—"}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
