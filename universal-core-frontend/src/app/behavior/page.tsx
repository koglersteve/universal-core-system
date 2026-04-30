"use client";

import { useEffect, useState } from "react";

export default function BehaviorPage() {
  const [behavior, setBehavior] = useState({});
  const [mode, setMode] = useState("idle");
  const [action, setAction] = useState("");
  const [actions, setActions] = useState([]);

  useEffect(() => {
    fetch("/api/behavior/state")
      .then((r) => r.json())
      .then((data) => {
        setBehavior(data.behavior || {});
        setActions(data.behavior?.actions || []);
      });
  }, []);

  const execute = async () => {
    const res = await fetch("/api/behavior/execute", {
      method: "POST",
      body: JSON.stringify({ behavior: action }),
    });

    const data = await res.json();
    setActions((prev) => [...prev, data.action]);
    setAction("");
  };

  const updateMode = async () => {
    const res = await fetch("/api/behavior/state/update", {
      method: "POST",
      body: JSON.stringify({ mode }),
    });

    const data = await res.json();
    setBehavior(data.behavior);
  };

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">Behavior Engine</h1>

      <div className="space-y-4">
        <input
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          className="p-2 bg-black/40 border border-gray-700 rounded w-full"
          placeholder="Behavior mode..."
        />

        <button
          onClick={updateMode}
          className="px-4 py-2 bg-blue-600 rounded"
        >
          Update Mode
        </button>

        <input
          value={action}
          onChange={(e) => setAction(e.target.value)}
          className="p-2 bg-black/40 border border-gray-700 rounded w-full"
          placeholder="Execute behavior..."
        />

        <button
          onClick={execute}
          className="px-4 py-2 bg-green-600 rounded"
        >
          Execute
        </button>
      </div>

      <ul className="space-y-2">
        {actions.map((a: any) => (
          <li
            key={a.id}
            className="p-4 border border-gray-700 rounded-lg bg-black/30"
          >
            <p className="text-sm text-gray-400">
              {new Date(a.timestamp).toLocaleString()}
            </p>
            <p className="font-semibold">{a.behavior}</p>
            <p className="text-gray-400 text-sm">{a.result}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
