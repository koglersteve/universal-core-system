"use client";
export const dynamic = "force-dynamic";

import type { ReactNode } from "react";

export default function CreatorLayout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen">
      <header className="border-b px-4 py-3">
        <h1 className="text-xl font-bold">Creator Studio</h1>
      </header>
      <section className="p-4">{children}</section>
    </main>
  );
}
