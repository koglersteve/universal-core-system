"use client";

import AppShell from "@/components/AppShell";
import SettingsList from "@/components/SettingsList";
import SettingsItem from "@/components/SettingsItem";

import ThemeIcon from "@/components/icons/settings/ThemeIcon";
import ExperimentsIcon from "@/components/icons/settings/ExperimentsIcon";
import AccountIcon from "@/components/icons/settings/AccountIcon";
import InfoIcon from "@/components/icons/settings/InfoIcon";

export default function SettingsPage() {
  return (
    <AppShell title="Settings">
      <div className="space-y-[var(--space-4)] animate-fadeIn">
        <SettingsList>
          <SettingsItem
            title="Theme"
            subtitle="Light, dark, or system"
            icon={ThemeIcon}
            onClick={() => alert("Theme settings coming soon")}
          />

          <SettingsItem
            title="Experimental Features"
            subtitle="Try upcoming tools early"
            icon={ExperimentsIcon}
            onClick={() => alert("Experiments coming soon")}
          />

          <SettingsItem
            title="Account"
            subtitle="Profile, email, and preferences"
            icon={AccountIcon}
            onClick={() => alert("Account settings coming soon")}
          />

          <SettingsItem
            title="About LaffLab"
            subtitle="Version, legal, privacy"
            icon={InfoIcon}
            onClick={() => alert("About page coming soon")}
          />
        </SettingsList>
      </div>
    </AppShell>
  );
}
