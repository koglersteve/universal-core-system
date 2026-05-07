import AccountSettings from "@components/settings/AccountSettings";
import SectionHeader from "@components/SectionHeader";

export default function AccountSettingsPage() {
  return (
    <div className="p-4 space-y-6">
      <SectionHeader title="Account" />
      <AccountSettings />
    </div>
  );
}
