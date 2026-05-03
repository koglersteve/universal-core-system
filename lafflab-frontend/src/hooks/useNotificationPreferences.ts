"use client";

import { useEffect, useState } from "react";

export function useNotificationPreferences(userId: string) {
  const [prefs, setPrefs] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/notifications/preferences?user=${userId}`);
      const data = await res.json();
      setPrefs(data);
    }
    load();
  }, [userId]);

  return { prefs };
}
