import CollabTool from "@components/creator/tools/CollabTool";
import SectionHeader from "@components/SectionHeader";

export default function CollabToolPage() {
  return (
    <div className="p-4 space-y-6">
      <SectionHeader title="Collaboration" />
      <CollabTool />
    </div>
  );
}
