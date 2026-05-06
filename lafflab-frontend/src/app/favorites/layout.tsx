import type { ReactNode } from "react";

export default function FavoritesLayout({ children }: { children: ReactNode }) {
  return <main className="min-h-screen">{children}</main>;
}
