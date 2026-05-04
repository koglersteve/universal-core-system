"use client";

import { useEffect, useMemo, useState } from "react";
import { useReactionStream } from "@/hooks/useReactionStream";
import type { ReactionEmojiKey } from "@/types/os";
import type { ReactionStreamEvent } from "@/core/reactions/stream";

type Bucket = {
  timestamp: number;
  counts: Record<string, number>;
};

const EMOJI_ORDER: ReactionEmojiKey[] = [
  "laugh",
  "smile",
  "shock",
  "expressionless",
  "angry",
  "mindblown",
  "crickets",
];

const WINDOW_MS = 60_000;
const BUCKET_MS = 5_000;

export default function EmotionalWave() {
  const events = useReactionStream();
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const buckets: Bucket[] = useMemo(() => {
    const map = new Map<number, Bucket>();
    for (const e of events) {
      const t = new Date(e.timestamp).getTime();
      if (now - t > WINDOW_MS) continue;
      const bucketKey = Math.floor(t / BUCKET_MS) * BUCKET_MS;
      if (!map.has(bucketKey)) {
        map.set(bucketKey, { timestamp: bucketKey, counts: {} });
      }
      const bucket = map.get(bucketKey)!;
      const emoji = e.event.emoji;
      bucket.counts[emoji] = (bucket.counts[emoji] || 0) + 1;
    }
    return Array.from(map.values()).sort(
      (a, b) => a.timestamp - b.timestamp
    );
  }, [events, now]);

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h2 className="text-white text-[var(--text-md)]">
          Emotional Wave (last 60s)
        </h2>
        <p className="text-white/60 text-[var(--text-xs)]">
          Live emotional activity across the ecosystem
        </p>
      </div>
      <div className="w-full overflow-x-auto">
        <div className="flex items-end gap-2 min-w-full">
          {buckets.map((bucket) => {
            const total = EMOJI_ORDER.reduce(
              (sum, emoji) => sum + (bucket.counts[emoji] || 0),
              0
            );
            const height = Math.min(100, total * 10);
            return (
              <div
                key={bucket.timestamp}
                className="flex flex-col items-center gap-1"
              >
                <div
                  className="w-4 rounded-t bg-gradient-to-t from-purple-500 via-pink-500 to-yellow-400"
                  style={{ height: `${height}px` }}
                />
                <span className="text-[10px] text-white/50">
                  {new Date(bucket.timestamp).toLocaleTimeString()}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-wrap gap-2 text-[var(--text-xs)] text-white/70">
        {EMOJI_ORDER.map((emoji) => (
          <span
            key={emoji}
            className="px-2 py-1 bg-white/5 border border-white/10 rounded-full"
          >
            {emoji}
          </span>
        ))}
      </div>
    </div>
  );
}
