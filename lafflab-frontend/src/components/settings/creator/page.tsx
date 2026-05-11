"use client";

import Toggle from "@/components/Toggle";
import { useState, useEffect } from "react";
import { LaffLabApi } from "@/lib/api";

export default function CreatorSettingsPage() {
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    LaffLabApi.getSettings().then(setSettings);
  }, []);

  async function updateSetting(key: string, value: boolean) {
    await LaffLabApi.updateSettings({ [key]: value });
    setSettings((prev: any) => ({ ...prev, [key]: value }));
  }

  if (!settings) return null;

  return (
    <div className="p-6 text-white">
      <h1 className="text-xl font-bold mb-4">Creator Settings</h1>

      <div className="flex items-center justify-between py-3">
        <span className="text-sm">Creator Mode</span>

        <Toggle
          checked={settings.creatorMode}
          onChange={(v) => updateSetting("creatorMode", v)}
        />
      </div>
    </div>
  );
}
