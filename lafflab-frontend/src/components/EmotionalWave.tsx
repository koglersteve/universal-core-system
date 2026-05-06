// src/components/EmotionalWave.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useReactionStream } from "@/hooks/useReactionStream";

type LocalReactionEvent = {
  timestamp: number;
};

type Bucket = {
  timestamp: number;
  count: number;
};

export default function EmotionalWave() {
  const events = useReactionStream() as unknown as LocalReactionEvent[];
  const [buckets, setBuckets] = useState<Bucket[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const now = Date.now();
    const windowMs = 10_000;

    const filtered = events.filter((e) => now - e.timestamp <= windowMs);

    const bucketMap: Record<number, number> = {};

    for (const e of filtered) {
      const bucket = Math.floor(e.timestamp / 1000);
      bucketMap[bucket] = (bucketMap[bucket] ?? 0) + 1;
    }

    const nextBuckets = Object.entries(bucketMap).map(([ts, count]) => ({
      timestamp: Number(ts),
      count,
    }));

    setBuckets(nextBuckets);
  }, [events]);

  return (
    <div ref={ref} className="w-full h-24 bg-black/10 rounded">
      {buckets.length === 0 && (
        <div className="text-center text-gray-500 p-4">No activity</div>
      )}
    </div>
  );
}
