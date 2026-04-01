"use client";

import { useEffect, useState } from "react";

export default function PhysicsVisualizations() {
  const [physics, setPhysics] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/analytics/physics");
      const data = await res.json();
      setPhysics(data.events ?? []);
    }
    load();
  }, []);

  return (
    <div className="console-section">
      <h2>Emotional Physics Visualizations</h2>

      <div className="physics-grid">
        {physics.map((p, i) => (
          <div key={i} className="physics-card">
            <h3>World {p.world}</h3>
            <p>Momentum: {p.momentum}</p>
            <p>Friction: {p.friction}</p>
            <p>Velocity: {p.velocity}</p>
            <p>Decay: {p.decay}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
