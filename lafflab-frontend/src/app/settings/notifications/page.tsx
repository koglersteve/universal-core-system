"use client";

import Toggle from "@/components/Toggle";
import { useSettings } from "@/hooks/useSettings";

export default function NotificationSettingsPage() {
  const { settings, updateSetting } = useSettings();

  if (!settings) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-4 bg-neutral-900 rounded-xl">
        <div>
          <p className="text-lg font-semibold">Push Notifications</p>
          <p className="text-neutral-400 text-sm">Receive updates and alerts</p>
        </div>

        <Toggle
          checked={settings.pushNotifications}
          onChange={(v) => updateSetting("pushNotifications", v)}
        />
      </div>
    </div>
  );
}

