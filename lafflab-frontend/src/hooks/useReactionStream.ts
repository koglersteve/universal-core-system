"use client";

import { useEffect, useState } from "react";
import type { LocalReactionEvent } from "@/core/reactions/stream";
import { getAllEvents } from "@/core/reactions/stream";

export function useReactionStream() {
  const [events, setEvents] = useState<LocalReactionEvent[]>([]);

  useEffect(() => {
    let active = true;

    async function poll() {
      try {
        await fetch("/api/reactions/summary");
        if (active) setEvents(getAllEvents());
      } catch (err) {
        console.error("Reaction stream polling failed:", err);
      }

      if (active) setTimeout(poll, 1000);
    }

    poll();
    return () => {
      active = false;
    };
  }, []);

  return events;
}
