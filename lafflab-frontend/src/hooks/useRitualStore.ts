"use client";

import { useState } from "react";
import { LaffLabApi } from "@/lib/api/LaffLabApi";

export function useRitualStore() {
  const [ritualMessage, setRitualMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function generateRitual() {
    try {
      setLoading(true);
      const data = await LaffLabApi.generateRitual();
      setRitualMessage(data.message);
    } finally {
      setLoading(false);
    }
  }

  return {
    ritualMessage,
    generateRitual,
    loading,
  };
}
