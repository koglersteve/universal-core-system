"use client";

import { useEffect, useState } from "react";
import { LaffLabApi } from "@/lib/api";

export function useNotificationPreferences(userId: string) {
  const [prefs, setPrefs] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const data = await LaffLabApi.getNotificationPreferences();
      setPrefs(data);
    }
    load();
  }, [userId]);

  return { prefs };
}
