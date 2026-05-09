"use client";

import { useState, useEffect } from "react";
import { fetchDailyRitual, setDailyRitualMessage } from "@/store/useRitualStore";
import type { Ritual } from "@/types/ritual";

export function useRitual() {
  const [ritual, setRitual] = useState<Ritual | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchDailyRitual();
        setRitual(data);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function updateMessage(message: string) {
    const updated = await setDailyRitualMessage(message);
    setRitual(updated);
  }

  return { ritual, loading, updateMessage };
}

