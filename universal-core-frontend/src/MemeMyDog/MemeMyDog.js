import React from "react";
import { useMood } from "../hooks/useMood";
import { getDogMemeTone } from "../../../universal-core/plugins/mememydog/mood";
import { getMoodCaption } from "../../../universal-core/lib/memeemotions";

export default function MemeMyDog() {
  const mood = useMood();

  // Mood-aware caption (e.g., “Let’s make this a core memory.”)
  const moodCaption = mood?.mood
    ? getMoodCaption(mood.mood)
    : "Your emotional vibes are unknown. Dog remains supportive.";

  // Dog-specific tone (e.g., “Your dog senses you’re overwhelmed and brings a shoe.”)
  const tone = mood
    ? getDogMemeTone(mood.userId || "demo-user", mood.mood)
    : "Your dog is vibing normally.";

  return (
    <div style={{ padding: 24 }}>
      <h1>Meme My Dog 🐶</h1>

      <p style={{ fontSize: 18, marginTop: 12 }}>
        <strong>Dog’s Emotional Read:</strong> {tone}
      </p>

      <p style={{ fontSize: 16, opacity: 0.7, marginTop: 8 }}>
        {moodCaption}
      </p>
    </div>
  );
}
