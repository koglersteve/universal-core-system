"use client";

import { useEffect, useState } from "react";

export default function EmotionPage() {
  const [emotion, setEmotion] = useState({});
  const [trigger, setTrigger] = useState("");
  const [mood, setMood] = useState("neutral");
  const [intensity, setIntensity] = useState(0);
  const [reactions, setReactions] = useState([]);

  useEffect(() => {
    fetch("/api/emotion/state")
      .then((r) => r.json())
      .then((data) => {
        setEmotion(data.emotion || {});
        setReactions(data.emotion?.reactions || []);
      });
  }, []);

  const react = async () => {
    const res = await fetch("/api/emotion/react", {
      method: "POST",
      body: JSON.stringify({ trigger, mood, intensity }),
    });

    const data = await res.json();
    setReactions((prev) => [...prev, data.reaction]);
    setTrigger("");
  };

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">Emotional Engine</h1>

      <div className="space-y-4">
        <input
          value={trigger}
          onChange={(e) => setTrigger(e.target.value)}
          className="p-2 bg-black/40 border border-gray-700 rounded w-full"
          placeholder="Trigger..."
        />

        <input
          type="text"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          className="p-2 bg-black/40 border border-gray-700 rounded w-full"
          placeholder="Mood"
        />

        <input
          type="number"
          value={intensity}
          onChange={(e) => setIntensity(Number(e.target.value))}
          className="p-2 bg-black/40 border border-gray-700 rounded w-full"
          placeholder="Intensity"
        />

        <button
          onClick={react}
          className="px-4 py-2 bg-blue-600 rounded"
        >
          React
        </button>
      </div>

      <ul className="space-y-2">
        {reactions.map((r: any) => (
          <li
            key={r.id}
            className="p-4 border border-gray-700 rounded-lg bg-black/30"
          >
            <p className="text-sm text-gray-400">
              {new Date(r.timestamp).toLocaleString()}
            </p>
            <p className="font-semibold">{r.trigger}</p>
            <p className="text-gray-400 text-sm">
              {r.mood} ({r.intensity})
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
