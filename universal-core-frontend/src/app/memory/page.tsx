"use client";

import { useEffect, useState } from "react";

export default function MemoryPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("/api/memory/recent")
      .then((r) => r.json())
      .then((data) => setEvents(data.events));
  }, []);

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">Memory Engine</h1>

      <ul className="space-y-2">
        {events.map((e: any) => (
          <li
            key={e.id}
            className="p-4 border border-gray-700 rounded-lg bg-black/30"
          >
            <p className="text-sm text-gray-400">{new Date(e.timestamp).toLocaleString()}</p>
            <p className="font-semibold">{e.type}</p>
            <p className="text-gray-400 text-sm">Universe: {e.universe}</p>
            <p className="text-gray-400 text-sm">Persona: {e.persona}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
