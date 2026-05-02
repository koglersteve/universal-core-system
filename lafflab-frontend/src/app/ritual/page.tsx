"use client";

import { useEffect, useState } from "react";
import { LaffLabApi } from "@/lib/api";

export default function RitualPage() {
  const [ritual, setRitual] = useState("");

  useEffect(() => {
    async function load() {
      const data = await LaffLabApi.getRitual();
      setRitual(data.message);
    }
    load();
  }, []);

  return (
    <div className="space-y-6">
      <div className="p-4 rounded-2xl bg-white shadow-md border border-brand-yellow/40 text-black">
        {ritual}
      </div>
    </div>
  );
}
