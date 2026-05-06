// src/hooks/useReactionStream.ts

import { useEffect, useState } from "react";
import type { LocalReactionEvent } from "@/core/reactions/stream";
import { getAllEvents } from "@/core/reactions/stream";

/**
 * Client-side polling subscription for reaction events.
 * Since the stream is in-memory on the server, we poll the API route.
 */

export function useReactionStream() {
  const [events, setEvents] = useState<LocalReactionEvent[]>([]);

  useEffect(() => {
    let active = true;

    async function poll() {
      try {
        const res = await fetch("/api/reactions/summary");
        const data = await res.json();

        // The API returns aggregated counts, not events.
        // So we fall back to local in-memory events for now.
        const localEvents = getAllEvents();

        if (active) {
          setEvents(localEvents);
        }
      } catch (err) {
        console.error("Reaction stream polling failed:", err);
      }

      if (active) {
        setTimeout(poll, 1000);
      }
    }

    poll();

    return () => {
      active = false;
    };
  }, []);

  return events;
}
