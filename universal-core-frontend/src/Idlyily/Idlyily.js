"use client";

import React from "react";
import { useMood } from "../hooks/useMood";
import { getIdlyilyPrompt } from "../../../universal-core/plugins/idlyily/mood";

export default function Idlyily() {
  const { mood, userId } = useMood();

  const prompt = mood
    ? getIdlyilyPrompt({
        userId: userId || "demo-user",
        mood,
      })
    : "How are you feeling today?";

  return (
    <div className="idlyily-screen">
      <h1>IDLYILY</h1>
      <p>{prompt}</p>
    </div>
  );
}
