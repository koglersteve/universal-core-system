"use client";

import { JokeReveal } from "./JokeReveal";
import { LaughMeter } from "./LaughMeter";

export default function JokeCard({ joke }) {
  return (
    <div className="space-y-2">
      <JokeReveal text={joke.text} />
      <LaughMeter />
    </div>
  );
}


