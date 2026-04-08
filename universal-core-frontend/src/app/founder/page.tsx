"use client";

import ProtectedLayout from "../(protected)/layout";
import AppSwitcher from "./components/AppSwitcher";
import SystemPanel from "./components/SystemPanel";
import PluginPanel from "./components/PluginPanel";
import MoodPanel from "./components/MoodPanel";
import LogsPanel from "./components/LogsPanel";
import FeatureFlags from "./components/FeatureFlags";
import EventTimeline from "./components/EventTimeline";

export default function FounderPage() {
  return (
    <ProtectedLayout>
      <div style={{ padding: 40 }}>
        <h1>Founder Console</h1>
        <p>Full system access. OS-level visibility.</p>

        <AppSwitcher />

        <div style={{ marginTop: 40 }}>
          <SystemPanel />
          <MoodPanel />
          <PluginPanel />
          <EventTimeline />
          <LogsPanel />
          <FeatureFlags />
        </div>
      </div>
    </ProtectedLayout>
  );
}


