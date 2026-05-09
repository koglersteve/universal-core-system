"use client";

import Toggle from "@/components/Toggle";
import { useSettings } from "@/hooks/useSettings";

export default function ThemeSettings() {
  const { settings, updateSetting } = useSettings();

  if (!settings) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-4 bg-neutral-900 rounded-lg">
        <div>
          <p className="text-lg font-semibold">Dark Mode</p>
          <p className="text-neutral-400 text-sm">Toggle dark/light theme</p>
        </div>

        <Toggle
          value={settings.darkMode}
          onChange={(v) => updateSetting("darkMode", v)}
        />
      </div>
    </div>
  );
}

