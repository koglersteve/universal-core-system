"use client";

import { useEffect, useState } from "react";

export default function CognitivePage() {
  const [state, setState] = useState({});
  const [input, setInput] = useState("");
  const [thoughts, setThoughts] = useState([]);

  useEffect(() => {
    fetch("/api/cognitive/state")
      .then((r) => r.json())
      .then((data) => {
        setState(data.cognitive || {});
        setThoughts(data.cognitive?.thoughts || []);
      });
  }, []);

  const think = async () => {
    const res = await fetch("/api/cognitive/think", {
      method: "POST",
      body: JSON.stringify({ input }),
    });

    const data = await res.json();
    setThoughts((prev) => [...prev, data.thought]);
    setInput("");
  };

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">Cognitive Engine</h1>

      <div className="space-y-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="p-2 bg-black/40 border border-gray-700 rounded w-full"
          placeholder="Enter thought input..."
        />

        <button
          onClick={think}
          className="px-4 py-2 bg-blue-600 rounded"
        >
          Think
        </button>
      </div>

      <ul className="space-y-2">
        {thoughts.map((t: any) => (
          <li
            key={t.id}
            className="p-4 border border-gray-700 rounded-lg bg-black/30"
          >
            <p className="text-sm text-gray-400">
              {new Date(t.timestamp).toLocaleString()}
            </p>
            <p className="font-semibold">{t.input}</p>
            <p className="text-gray-400 text-sm">{t.output}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
