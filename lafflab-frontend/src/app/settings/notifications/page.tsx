import NotificationSettings from "@components/settings/NotificationSettings";
import SectionHeader from "@components/SectionHeader";

export default function NotificationSettingsPage() {
  return (
    <div className="p-4 space-y-6">
      <SectionHeader title="Notifications" />
      <NotificationSettings />
    </div>
  );
}
