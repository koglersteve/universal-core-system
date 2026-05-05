// src/hooks/useReactionStream.ts

import { useEffect, useState } from "react";
import type { ReactionStreamEvent } from "@/types/os";
import { getAllEvents } from "@/core/reactions/stream";

export function useReactionStream() {
  const [events, setEvents] = useState<ReactionStreamEvent[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setEvents([...getAllEvents()]);
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return { events };
}
