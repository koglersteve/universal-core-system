"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { submitMood } from "./MoodCheckSubmit";
import { useMood } from "@/hooks/useMood";
import { useMoodHistory } from "@/hooks/useMoodHistory";

const MOODS = [
  { id: "happy", label: "Happy", emoji: "😊" },
  { id: "sad", label: "Sad", emoji: "😢" },
  { id: "stressed", label: "Stressed", emoji: "😣" },
  { id: "angry", label: "Angry", emoji: "😡" },
  { id: "tired", label: "Tired", emoji: "🥱" },
  { id: "excited", label: "Excited", emoji: "🤩" }
];

export function MoodCheckHome() {
  const [selected, setSelected] = useState<string | null>(null);
  const router = useRouter();

  const { setMood } = useMood();
  const { addMood } = useMoodHistory();

  const handleSubmit = async () => {
    if (!selected) return;

    // Write to backend (canonical payload)
    await submitMood({ mood: selected });

    // Write to OS-level emotional state
    setMood(selected);

    // Write to mood history
    addMood(selected);

    // Redirect to the correct frontend result page
    router.push(`/moodcheck/result?mood=${selected}`);
  };

  return (
    <div className="moodcheck-container">
      <h1 className="moodcheck-title">How are you feeling?</h1>

      <div className="mood-grid">
        {MOODS.map(m => (
          <button
            key={m.id}
            className={`mood-option ${selected === m.id ? "selected" : ""}`}
            onClick={() => setSelected(m.id)}
          >
            <span className="mood-emoji">{m.emoji}</span>
            <span>{m.label}</span>
          </button>
        ))}
      </div>

      <button
        className="moodcheck-button"
        disabled={!selected}
        onClick={handleSubmit}
      >
        Continue
      </button>
    </div>
  );
}
