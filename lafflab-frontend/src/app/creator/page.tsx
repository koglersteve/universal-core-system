"use client";

import AppShell from "@/components/AppShell";
import { RequireAuth } from "@/components/RequireAuth";

export default function CreatorHomePage() {
  return (
    <RequireAuth>
      <AppShell title="Creator Studio">
        {/* existing Creator content */}
      </AppShell>
    </RequireAuth>
  );
}
