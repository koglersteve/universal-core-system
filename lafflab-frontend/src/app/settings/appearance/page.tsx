import AppearanceSettings from "@components/settings/Appearance/AppearanceSettings";
import SectionHeader from "@components/SectionHeader";

export default function AppearanceSettingsPage() {
  return (
    <div className="p-4 space-y-6">
      <SectionHeader title="Appearance" />
      <AppearanceSettings />
    </div>
  );
}
