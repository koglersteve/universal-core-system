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
    <div className="app-shell">
      <header className="app-shell-header">
        <h1>{title}</h1>
      </header>

      <main className="app-shell-content">
        {children}
      </main>
    </div>
  );
}
