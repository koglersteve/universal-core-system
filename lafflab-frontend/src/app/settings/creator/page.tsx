import CreatorSettings from "@components/settings/CreatorSettings";
import SectionHeader from "@components/SectionHeader";

export default function CreatorSettingsPage() {
  return (
    <div className="p-4 space-y-6">
      <SectionHeader title="Creator Mode" />
      <CreatorSettings />
    </div>
  );
}
