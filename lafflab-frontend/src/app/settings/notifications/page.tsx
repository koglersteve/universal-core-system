"use client";

import Toggle from "@/components/Toggle";
import { useSettings } from "@/hooks/useSettings";

export default function NotificationSettings() {
  const { settings, updateSetting } = useSettings();

  if (!settings) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-4 bg-neutral-900 rounded-lg">
        <div>
          <p className="text-lg font-semibold">Push Notifications</p>
          <p className="text-neutral-400 text-sm">Enable push alerts</p>
        </div>

        <Toggle
          value={settings.pushNotifications}
          onChange={(v) => updateSetting("pushNotifications", v)}
        />
      </div>

      <div className="flex items-center justify-between p-4 bg-neutral-900 rounded-lg">
        <div>
          <p className="text-lg font-semibold">Email Alerts</p>
          <p className="text-neutral-400 text-sm">Control email frequency</p>
        </div>

        <Toggle
          value={settings.emailAlerts}
          onChange={(v) => updateSetting("emailAlerts", v)}
        />
      </div>
    </div>
  );
}

