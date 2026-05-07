import CreatorStatusPanel from "@components/creator/tools/CreatorStatusPanel";
import SectionHeader from "@components/SectionHeader";

export default function CreatorStatusPage() {
  return (
    <div className="p-4 space-y-6">
      <SectionHeader title="Creator Status" />
      <CreatorStatusPanel />
    </div>
  );
}
