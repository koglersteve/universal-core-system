"use client";

import type { ReactNode } from "react";

export default function AppShell({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <header className="px-4 py-3 border-b border-white/10 bg-black/40 backdrop-blur">
        <h1 className="text-xl font-semibold">{title}</h1>
      </header>

      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
