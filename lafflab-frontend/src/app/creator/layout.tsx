import SectionHeader from "@components/SectionHeader";

export default function CreatorLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <SectionHeader title="Creator" />
      <div className="flex-1">{children}</div>
    </div>
  );
}
