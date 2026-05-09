"use client";

import { useEffect, useState } from "react";

export function useSettings() {
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then(setSettings);
  }, []);

  const updateSetting = async (key: string, value: any) => {
    const res = await fetch("/api/settings", {
      method: "PATCH",
      body: JSON.stringify({ [key]: value })
    });

    const updated = await res.json();
    setSettings(updated);
  };

  return { settings, updateSetting };
}
