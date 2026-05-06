import type { ReactNode } from "react";

export default function ForYouLayout({ children }: { children: ReactNode }) {
  return <main className="min-h-screen">{children}</main>;
}
