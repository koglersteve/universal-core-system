"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { os } from "@/lib/backend";

export default function OSPage() {
  const [data, setData] = useState({
    message: "Loading OS...",
    modules: [],
  });

  const [error, setError] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const result = await os("");
        setData(result);
      } catch (e) {
        console.error("OS fetch failed:", e);
        setError(true);
        setData({
          message: "OS offline",
          modules: [],
        });
      }
    }

    load();
  }, []);

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">OS Dashboard</h1>

      <p className={`text-gray-400 ${error ? "text-red-400" : ""}`}>
        {data.message}
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

        {/* Multiverse Tile */}
        <Link href="/multiverse">
          <div className="p-4 border border-gray-700 rounded-lg bg-black/30 cursor-pointer">
            <h2 className="text-xl font-semibold">Multiverse</h2>
            <p className="text-gray-500 text-sm">Switch universes</p>
          </div>
        </Link>

        {/* Persona OS Tile */}
        <Link href="/persona">
          <div className="p-4 border border-gray-700 rounded-lg bg-black/30 cursor-pointer">
            <h2 className="text-xl font-semibold">Persona OS</h2>
            <p className="text-gray-500 text-sm">Emotional identity</p>
          </div>
        </Link>

        {/* Memory Engine Tile */}
        <Link href="/memory">
          <div className="p-4 border border-gray-700 rounded-lg bg-black/30 cursor-pointer">
            <h2 className="text-xl font-semibold">Memory Engine</h2>
            <p className="text-gray-500 text-sm">Recent events</p>
          </div>
        </Link>

        {/* Cognitive Engine Tile */}
        <Link href="/cognitive">
          <div className="p-4 border border-gray-700 rounded-lg bg-black/30 cursor-pointer">
            <h2 className="text-xl font-semibold">Cognitive Engine</h2>
            <p className="text-gray-500 text-sm">Thought pipeline</p>
          </div>
        </Link>

        {/* OS Modules */}
        {data.modules.map((m: string) => (
          <div
            key={m}
            className="p-4 border border-gray-700 rounded-lg bg-black/30"
          >
            <h2 className="text-xl font-semibold">{m}</h2>
            <p className="text-gray-500 text-sm">Subsystem online</p>
          </div>
        ))}
      </div>
    </div>
  );
}
