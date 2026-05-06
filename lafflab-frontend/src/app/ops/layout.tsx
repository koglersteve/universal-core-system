import type { ReactNode } from "react";

export default function SettingsLayout({ children }: { children: ReactNode }) {
  return <main className="min-h-screen">{children}</main>;
}
