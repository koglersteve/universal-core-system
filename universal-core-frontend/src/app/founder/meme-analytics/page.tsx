"use client";

import { useEffect, useState } from "react";

export default function MemeAnalyticsPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/meme/analytics")
      .then((r) => r.json())
      .then(setData)
      .catch(() => {});
  }, []);

  if (!data) return <div style={{ padding: 24 }}>Loading analytics…</div>;

  return (
    <div style={{ padding: 24 }}>
      <h1>Meme Creation Analytics</h1>

      <h2 style={{ marginTop: 24 }}>By App</h2>
      <ul>
        {data.byApp.map((row: any) => (
          <li key={row.app}>
            {row.app}: {row._count._all}
          </li>
        ))}
      </ul>

      <h2 style={{ marginTop: 24 }}>By Mood</h2>
      <ul>
        {data.byMood.map((row: any) => (
          <li key={row.mood || "unknown"}>
            {row.mood || "unknown"}: {row._count._all}
          </li>
        ))}
      </ul>
    </div>
  );
}
