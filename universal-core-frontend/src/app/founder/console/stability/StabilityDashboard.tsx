"use client";

import { useEffect, useState } from "react";

export default function StabilityDashboard() {
  const [stabilityIndex, setStabilityIndex] = useState<number | null>(null);
  const [metrics, setMetrics] = useState<any>(null);
  const [streamValue, setStreamValue] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch initial stability metrics
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/analytics/stability");
        const data = await res.json();
        setStabilityIndex(data.stabilityIndex);
        setMetrics(data.metrics);
      } catch (err) {
        console.error("Failed to load stability metrics", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Live SSE stream for real‑time stability updates
  useEffect(() => {
    const eventSource = new EventSource("/api/analytics/stream");

    eventSource.onmessage = (event) => {
      try {
        const parsed = JSON.parse(event.data);
        setStreamValue(parsed.value);
      } catch (e) {
        console.error("Stream parse error", e);
      }
    };

    eventSource.onerror = () => {
      console.warn("SSE connection lost");
      eventSource.close();
    };

    return () => eventSource.close();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Stability Dashboard</h1>

      {loading && (
        <p className="text-gray-500">Loading stability metrics…</p>
      )}

      {!loading && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white shadow rounded-lg">
              <h2 className="text-sm text-gray-500">Stability Index</h2>
              <p className="text-3xl font-semibold">
                {stabilityIndex ?? "—"}
              </p>
            </div>

            <div className="p-4 bg-white shadow rounded-lg">
              <h2 className="text-sm text-gray-500">Live Stream</h2>
              <p className="text-3xl font-semibold">
                {streamValue ?? "—"}
              </p>
            </div>

            <div className="p-4 bg-white shadow rounded-lg">
              <h2 className="text-sm text-gray-500">Signal Health</h2>
              <p className="text-3xl font-semibold">
                {metrics?.signalHealth ?? "—"}
              </p>
            </div>
          </div>

          <div className="p-4 bg-white shadow rounded-lg">
            <h2 className="text-lg font-semibold mb-2">System Metrics</h2>

            {metrics ? (
              <ul className="space-y-1 text-gray-700">
                <li>CPU Load: {metrics.cpuLoad}</li>
                <li>Memory Usage: {metrics.memoryUsage}</li>
                <li>Latency: {metrics.latency}ms</li>
                <li>Requests/min: {metrics.requestsPerMinute}</li>
              </ul>
            ) : (
              <p className="text-gray-500">No metrics available.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

