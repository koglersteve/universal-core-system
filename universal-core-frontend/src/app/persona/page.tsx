"use client";

import { useEffect, useState } from "react";

export default function PersonaPage() {
  const [personas, setPersonas] = useState({});
  const [active, setActive] = useState("");

  useEffect(() => {
    fetch("/api/persona/list")
      .then((r) => r.json())
      .then((data) => setPersonas(data.personas));

    const cookie = document.cookie.match(/personaId=([^;]+)/);
    setActive(cookie ? cookie[1] : "default-persona");
  }, []);

  const switchPersona = async (id: string) => {
    await fetch(`/api/persona/switch/${id}`, { method: "POST" });
    document.cookie = `personaId=${id}; Path=/; SameSite=Lax`;
    setActive(id);
    window.location.reload();
  };

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">Persona OS</h1>

      <h2 className="text-xl">Active Persona: {active}</h2>

      <ul className="space-y-2">
        {Object.values(personas).map((p: any) => (
          <li key={p.id} className="p-4 border border-gray-700 rounded-lg bg-black/30">
            <div className="flex justify-between">
              <div>
                <h3 className="text-lg font-semibold">{p.name}</h3>
                <p className="text-gray-400 text-sm">{p.id}</p>
              </div>

              {active !== p.id && (
                <button
                  onClick={() => switchPersona(p.id)}
                  className="px-3 py-1 bg-blue-600 rounded"
                >
                  Switch
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
