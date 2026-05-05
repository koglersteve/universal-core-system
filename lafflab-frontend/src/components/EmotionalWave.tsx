"use client";

import { useEffect, useRef, useState } from "react";
import { useReactionStream } from "@/hooks/useReactionStream";
import type { ReactionEmojiKey, ReactionEvent } from "@/types/os";

type Bucket = {
  timestamp: number;
  emoji: ReactionEmojiKey;
};

export default function EmotionalWave() {
  const { events } = useReactionStream(); // events: ReactionEvent[]
  const [buckets, setBuckets] = useState<Bucket[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!events.length) return;

    const latest: ReactionEvent = events[events.length - 1];

    setBuckets((prev) => [
      ...prev,
      {
        timestamp: latest.timestamp,
        emoji: latest.emoji as ReactionEmojiKey,
      },
    ]);
  }, [events]);

  return (
    <div
      ref={ref}
      className="w-full h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded overflow-hidden flex items-end"
    >
      {buckets.map((b, i) => (
        <div
          key={i}
          className="w-1 bg-purple-500 opacity-70"
          style={{
            height: `${20 + (i % 40)}%`,
            marginRight: "2px",
          }}
        />
      ))}
    </div>
  );
}
