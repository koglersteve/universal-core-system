"use client";

import { useEffect, useState } from "react";

export function useSettings() {
  const [settings, setSettings] = useState<any>(null);

  // Load from local cache instantly
  useEffect(() => {
    const cached = localStorage.getItem("settings");
    if (cached) setSettings(JSON.parse(cached));

    // Then sync with backend
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => {
        setSettings(data);
        localStorage.setItem("settings", JSON.stringify(data));
      });
  }, []);

  const updateSetting = async (key: string, value: any) => {
    // Optimistic update
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    localStorage.setItem("settings", JSON.stringify(newSettings));

    // Sync to backend
    await fetch("/api/settings", {
      method: "PATCH",
      body: JSON.stringify({ [key]: value })
    });
  };

  return { settings, updateSetting };
}
