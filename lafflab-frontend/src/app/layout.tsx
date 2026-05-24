import AppShell from "@/components/AppShell";

export default function LaffLabLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell>
      {children}
    </AppShell>
  );
}
