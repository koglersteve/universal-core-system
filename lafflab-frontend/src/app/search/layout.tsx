import SectionHeader from "@components/SectionHeader";

export default function SearchLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <SectionHeader title="Search" />
      <div className="flex-1">{children}</div>
    </div>
  );
}
