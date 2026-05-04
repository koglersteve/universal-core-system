"use client";

import { useEffect, useState } from "react";
import type { ReactionStreamEvent } from "@/core/reactions/stream";

export function useReactionStream() {
  const [events, setEvents] = useState<ReactionStreamEvent[]>([]);

  useEffect(() => {
    const source = new EventSource("/api/reactions/stream");
    source.onmessage = (msg) => {
      try {
        const data: ReactionStreamEvent = JSON.parse(msg.data);
        setEvents((prev) => [data, ...prev]);
      } catch {}
    };
    return () => source.close();
  }, []);

  return events;
}
