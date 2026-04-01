"use client";

import { useEffect, useState } from "react";

export default function PluginHealthDashboard() {
  const [plugins, setPlugins] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/plugins/health");
      const data = await res.json();
      setPlugins(data.plugins ?? []);
    }
    load();
  }, []);

  return (
    <div className="console-section">
      <h1>Plugin Health Dashboard</h1>
      <p>Live plugin uptime, latency, errors, and heartbeat status.</p>

      <div className="plugin-grid">
        {plugins.map((p, i) => (
          <div key={i} className="plugin-card">
            <h3>{p.name}</h3>
            <p>Status: <strong>{p.status}</strong></p>
            <p>Version: {p.version}</p>
            <p>Latency: {p.latencyMs} ms</p>
            <p>Errors: {p.errorCount}</p>
            <p>Last Heartbeat: {new Date(p.lastHeartbeat).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
