import SettingsHome from "@components/settings/SettingsHome";
import SectionHeader from "@components/SectionHeader";

export default function SettingsPage() {
  return (
    <div className="p-4 space-y-6">
      <SectionHeader title="Settings" />
      <SettingsHome />
    </div>
  );
}
