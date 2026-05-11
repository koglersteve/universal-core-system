"use client";

import { useEffect, useState } from "react";

export function useSettings() {
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    const cached = localStorage.getItem("settings");
    if (cached) setSettings(JSON.parse(cached));

    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => {
        setSettings(data);
        localStorage.setItem("settings", JSON.stringify(data));
      });
  }, []);

  const updateSetting = async (key: string, value: any) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    localStorage.setItem("settings", JSON.stringify(newSettings));

    await fetch("/api/settings", {
      method: "PATCH",
      body: JSON.stringify({ [key]: value }),
    });
  };

  return { settings, updateSetting };
}
