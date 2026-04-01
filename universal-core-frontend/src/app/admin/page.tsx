"use client";

import { useEffect, useState } from "react";

export default function PluginPanel() {
  const [plugins, setPlugins] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await fetch("http://localhost:3001/api/plugin-health");
      const data = await res.json();
      setPlugins(data.plugins);
    }
    load();
  }, []);

  return (
    <div style={{ marginTop: 40 }}>
      <h2>Plugin Health</h2>

      <table style={{ width: "100%", marginTop: 20 }}>
        <thead>
          <tr>
            <th align="left">Plugin</th>
            <th align="left">Version</th>
            <th align="left">Status</th>
            <th align="left">Last Heartbeat</th>
            <th align="left">Last Error</th>
          </tr>
        </thead>
        <tbody>
          {plugins.map((p: any) => (
            <tr key={p.name}>
              <td>{p.name}</td>
              <td>{p.version}</td>
              <td style={{ color: p.status === "ok" ? "green" : "red" }}>
                {p.status}
              </td>
              <td>{p.lastHeartbeat}</td>
              <td>{p.lastError || "None"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


