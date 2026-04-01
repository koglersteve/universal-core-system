import React from "react";
import { useMood } from "../hooks/useMood";
import { getCatMemeTone } from "../../../universal-core/plugins/mememycat/mood";
import { getMoodCaption } from "../../../universal-core/lib/memeemotions";

export default function MemeMyCat() {
  const mood = useMood();

  // Mood-aware caption (e.g., “Too many tabs open in my brain.”)
  const moodCaption = mood?.mood
    ? getMoodCaption(mood.mood)
    : "Your emotional state is a mystery. The cat approves.";

  // Cat-specific tone (e.g., “Your cat is judging you for being overwhelmed.”)
  const tone = mood
    ? getCatMemeTone(mood.userId || "demo-user", mood.mood)
    : "Your cat is judging you neutrally.";

  return (
    <div style={{ padding: 24 }}>
      <h1>Meme My Cat 🐱</h1>

      <p style={{ fontSize: 18, marginTop: 12 }}>
        <strong>Cat’s Mood Read:</strong> {tone}
      </p>

      <p style={{ fontSize: 16, opacity: 0.7, marginTop: 8 }}>
        {moodCaption}
      </p>
    </div>
  );
}
