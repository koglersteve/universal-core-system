"use client";

import { useEffect, useState } from "react";
import { LaffLabApi } from "@/lib/api";

export default function RitualPage() {
  const [ritual, setRitual] = useState<string>("Loading...");

  useEffect(() => {
    async function load() {
      const data = await LaffLabApi.generateRitual(); // ✅ FIXED
      setRitual(data.message);
    }
    load();
  }, []);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Your Daily Ritual</h1>

      <div className="p-4 rounded-xl bg-white/10 border border-white/20 backdrop-blur">
        <p className="text-lg whitespace-pre-line">{ritual}</p>
      </div>
    </div>
  );
}
