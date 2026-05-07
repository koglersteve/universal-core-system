import ProfileSettings from "@components/settings/ProfileSettings";
import SectionHeader from "@components/SectionHeader";

export default function ProfileSettingsPage() {
  return (
    <div className="p-4 space-y-6">
      <SectionHeader title="Profile" />
      <ProfileSettings />
    </div>
  );
}
