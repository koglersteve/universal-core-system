import TemplateLibrary from "@components/creator/tools/TemplateLibrary";
import SectionHeader from "@components/SectionHeader";

export default function TemplatesPage() {
  return (
    <div className="p-4 space-y-6">
      <SectionHeader title="Templates" />
      <TemplateLibrary />
    </div>
  );
}
