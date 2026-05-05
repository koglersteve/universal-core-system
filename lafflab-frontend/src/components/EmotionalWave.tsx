// src/components/EmotionalWave.tsx

import { useEffect, useRef, useState } from "react";
import { useReactionStream } from "@/hooks/useReactionStream";
import type { ReactionEmojiKey, ReactionStreamEvent } from "@/types/os";

type Bucket = {
  timestamp: number;
  emoji: ReactionEmojiKey;
};

export default function EmotionalWave() {
  const { events } = useReactionStream();
  const [buckets, setBuckets] = useState<Bucket[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (events.length === 0) return;

    const latest = events[events.length - 1];
    if (!latest) return; // TS-safe guard

    setBuckets((prev) => [
      ...prev,
      {
        timestamp: latest.timestamp,
        emoji: latest.emoji,
      },
    ]);
  }, [events]);

  return (
    <div ref={ref} className="w-full h-24 flex items-end gap-1">
      {buckets.map((b, i) => (
        <div
          key={i}
          className="w-2 bg-blue-500 rounded"
          style={{
            height: `${20 + (b.timestamp % 40)}px`,
          }}
        />
      ))}
    </div>
  );
}
