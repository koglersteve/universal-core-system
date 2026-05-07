import PrivacySettings from "@components/settings/PrivacySettings";
import SectionHeader from "@components/SectionHeader";

export default function PrivacySettingsPage() {
  return (
    <div className="p-4 space-y-6">
      <SectionHeader title="Privacy" />
      <PrivacySettings />
    </div>
  );
}

