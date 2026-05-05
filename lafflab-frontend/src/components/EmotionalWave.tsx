"use client";

import { useEffect, useRef, useState } from "react";
import { useReactionStream } from "@/hooks/useReactionStream";
import type { ReactionEvent } from "@/types/os";

type Bucket = {
  timestamp: number;
  count: number;
};

export default function EmotionalWave() {
  const events: ReactionEvent[] = useReactionStream();
  const [buckets, setBuckets] = useState<Bucket[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (events.length === 0) return;

    const latest = events[events.length - 1];
    if (!latest) return;

    setBuckets((prev) => [
      ...prev,
      {
        timestamp: latest.timestamp,
        count: prev.length ? prev[prev.length - 1].count + 1 : 1,
      },
    ]);
  }, [events]);

  return (
    <div ref={ref} className="w-full h-40 bg-blue-100 rounded p-4">
      <div className="text-lg font-semibold mb-2">Emotional Wave</div>
      <div className="text-sm text-gray-600">
        Total events: {events.length}
      </div>
    </div>
  );
}
