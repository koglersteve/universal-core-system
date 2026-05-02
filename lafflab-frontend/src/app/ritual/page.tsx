"use client";

import { useRitual } from "@/hooks/useRitual";

export default function RitualPage() {
  const { ritual, loading } = useRitual();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Daily Ritual</h1>

      {loading && <p>Loading…</p>}

      {ritual && (
        <div className="p-4 border rounded bg-white shadow-sm">
          <p className="text-lg">{ritual.message}</p>
        </div>
      )}
    </div>
  );
}
