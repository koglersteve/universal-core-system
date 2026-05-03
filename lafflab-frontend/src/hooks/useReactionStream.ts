"use client";

import { useEffect, useState } from "react";

export function useReactionStream() {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    const source = new EventSource("/api/reactions/stream");

    source.onmessage = (msg) => {
      try {
        const data = JSON.parse(msg.data);
        setEvents((prev) => [data, ...prev]);
      } catch {}
    };

    return () => source.close();
  }, []);

  return events;
}
