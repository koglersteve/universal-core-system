"use client";

import { useState, useEffect } from "react";
import AppShell from "@/components/AppShell";

export default function NotificationSettings() {
  const [doNotAllow, setDoNotAllow] = useState(false);
  const [inApp, setInApp] = useState(true);
  const [email, setEmail] = useState(false);
  const [push, setPush] = useState(false);

  // When master toggle is ON → disable all methods
  useEffect(() => {
    if (doNotAllow) {
      setInApp(false);
      setEmail(false);
      setPush(false);
    }
  }, [doNotAllow]);

  // When any method is turned ON → disable master toggle
  useEffect(() => {
    if (inApp || email || push) {
      setDoNotAllow(false);
    }
  }, [inApp, email, push]);

  return (
    <AppShell title="Notification Settings">
      <div className="space-y-[var(--space-6)]">

        <p className="text-white/70 text-[var(--text-sm)]">
          Choose how you want to receive notifications. Turning on “Do Not Allow”
          disables all notification methods.
        </p>

        {/* Master Toggle */}
        <div className="flex items-center justify-between p-[var(--space-4)] bg-white/5 rounded-lg border border-white/10">
          <div>
            <h2 className="text-[var(--text-lg)] font-semibold">Do Not Allow Notifications</h2>
            <p className="text-white/50 text-[var(--text-xs)]">
              Disables all notification types
            </p>
          </div>

          <input
            type="checkbox"
            checked={doNotAllow}
            onChange={(e) => setDoNotAllow(e.target.checked)}
            className="w-5 h-5 accent-white"
          />
        </div>

        {/* In-App */}
        <div className="flex items-center justify-between p-[var(--space-4)] bg-white/5 rounded-lg border border-white/10">
          <div>
            <h2 className="text-[var(--text-lg)] font-semibold">In-App Notifications</h2>
            <p className="text-white/50 text-[var(--text-xs)]">
              Alerts inside the app
            </p>
          </div>

          <input
            type="checkbox"
            checked={inApp}
            disabled={doNotAllow}
            onChange={(e) => setInApp(e.target.checked)}
            className="w-5 h-5 accent-white disabled:opacity-30"
          />
        </div>

        {/* Email */}
        <div className="flex items-center justify-between p-[var(--space-4)] bg-white/5 rounded-lg border border-white/10">
          <div>
            <h2 className="text-[var(--text-lg)] font-semibold">Email Notifications</h2>
            <p className="text-white/50 text-[var(--text-xs)]">
              Updates sent to your email
            </p>
          </div>

          <input
            type="checkbox"
            checked={email}
            disabled={doNotAllow}
            onChange={(e) => setEmail(e.target.checked)}
            className="w-5 h-5 accent-white disabled:opacity-30"
          />
        </div>

        {/* Push */}
        <div className="flex items-center justify-between p-[var(--space-4)] bg-white/5 rounded-lg border border-white/10">
          <div>
            <h2 className="text-[var(--text-lg)] font-semibold">Push Notifications</h2>
            <p className="text-white/50 text-[var(--text-xs)]">
              Alerts sent to your device
            </p>
          </div>

          <input
            type="checkbox"
            checked={push}
            disabled={doNotAllow}
            onChange={(e) => setPush(e.target.checked)}
            className="w-5 h-5 accent-white disabled:opacity-30"
          />
        </div>
      </div>
    </AppShell>
  );
}
