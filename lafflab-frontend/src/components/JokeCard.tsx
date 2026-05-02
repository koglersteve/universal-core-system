"use client";

import { JokeReveal } from "./JokeReveal";
import { LaughMeter } from "./LaughMeter";
import type { Joke } from "@/types/jokes";

interface JokeCardProps {
  joke: Joke;
}

export default function JokeCard({ joke }: JokeCardProps) {
  return (
    <div className="space-y-2">
      <JokeReveal text={joke.text} />
      <LaughMeter />
    </div>
  );
}


