// src/hooks/useReactionStream.ts

import { useEffect, useState } from "react";
import type { ReactionEvent } from "@/types/os";
import { getAllEvents, subscribeToReactions } from "@/core/reactions/stream";

export function useReactionStream() {
  const [events, setEvents] = useState<ReactionEvent[]>([]);

  useEffect(() => {
    setEvents(getAllEvents());

    const unsubscribe = subscribeToReactions((event) => {
      setEvents((prev) => [...prev, event]);
    });

    return unsubscribe;
  }, []);

  return events;
}
