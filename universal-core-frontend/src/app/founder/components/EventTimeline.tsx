"use client";

import React, { useEffect, useState } from "react";

interface EventItem {
  id: string;
  app: string;
  type: string;
  ts: number;
  mood?: string;
  world?: string;
  trait?: string;
  agent?: string;
  physics_momentum?: number;
  identity_profile?: string;
  payload?: any;
}

export default function EventTimeline() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEvents() {
      try {
        const res = await fetch("/api/events");
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error("Failed to load events:", err);
      } finally {
        setLoading(false);
      }
    }

    loadEvents();
  }, []);

  if (loading) {
    return <div>Loading timeline…</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Event Timeline</h2>
      <ul style={{ marginTop: "20px" }}>
        {events.map((ev) => (
          <li key={ev.id} style={{ marginBottom: "12px" }}>
            <strong>{ev.type}</strong> — {new Date(ev.ts).toLocaleString()}
            <div style={{ fontSize: "0.9em", opacity: 0.7 }}>
              {ev.app} / {ev.mood ?? "no mood"} / {ev.world ?? "no world"}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
