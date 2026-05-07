import BillingSettings from "@components/settings/BillingSettings";
import SectionHeader from "@components/SectionHeader";

export default function BillingSettingsPage() {
  return (
    <div className="p-4 space-y-6">
      <SectionHeader title="Billing" />
      <BillingSettings />
    </div>
  );
}
