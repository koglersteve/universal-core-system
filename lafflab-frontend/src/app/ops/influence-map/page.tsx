"use client";

import AppShell from "@/components/AppShell";
import CrossAppInfluenceMap from "@/components/CrossAppInfluenceMap";

export default function InfluenceMapPage() {
  return (
    <AppShell title="Influence Map">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Cross-App Influence Map</h1>
        <p className="mb-6 text-gray-600">
          Visualize how emotional signals propagate between surfaces and apps.
        </p>

        {/* Provide required prop */}
        <CrossAppInfluenceMap log={[]} />
      </div>
    </AppShell>
  );
}
