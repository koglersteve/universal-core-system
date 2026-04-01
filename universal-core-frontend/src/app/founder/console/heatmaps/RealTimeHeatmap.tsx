"use client";

import { useEffect, useState } from "react";

export default function RealTimeHeatmap() {
  const [events, setEvents] = useState([]);

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

  const heatmap = buildHeatmap(events);

  return (
    <div className="heatmap-container">
      <h1>Real‑Time Emotional Stability Heatmap</h1>

      <div className="heatmap-grid">
        {Object.entries(heatmap).map(([key, cell], i) => (
          <div key={i} className="heatmap-cell">
            <strong>{cell.app}</strong>
            <div>World: {cell.world}</div>
            <div>Mood: {cell.mood}</div>
            <div>Trait: {cell.trait}</div>
            <div>Agent: {cell.agent}</div>
            <div>Events: {cell.count}</div>
            <div>Crashes: {cell.crashes}</div>
            <div>Freezes: {cell.freezes}</div>
            <div>ANRs: {cell.anrs}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function buildHeatmap(events) {
  const map = {};

  for (const e of events) {
    const key = [
      e.app,
      e.world ?? "none",
      e.mood ?? "none",
      e.trait ?? "none",
      e.agent ?? "none"
    ].join("|");

    if (!map[key]) {
      map[key] = {
        app: e.app,
        world: e.world ?? "none",
        mood: e.mood ?? "none",
        trait: e.trait ?? "none",
        agent: e.agent ?? "none",
        count: 0,
        crashes: 0,
        freezes: 0,
        anrs: 0
      };
    }

    map[key].count++;

    if (e.type === "crash.metrics") map[key].crashes++;
    if (e.type === "freeze.metrics") map[key].freezes++;
    if (e.type === "anr.metrics") map[key].anrs++;
  }

  return map;
}
