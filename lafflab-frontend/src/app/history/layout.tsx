import type { ReactNode } from "react";

export default function HistoryLayout({ children }: { children: ReactNode }) {
  return <main className="min-h-screen">{children}</main>;
}
