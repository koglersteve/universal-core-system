"use client";

import React from "react";
import { useHoaMemeStore } from "./state/useHoaMemeStore";
import MemeCard from "./components/MemeCard";

export default function HoaMemeTemplates() {
  const { templates } = useHoaMemeStore();

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">HOA Meme Templates</h1>

      <p className="text-gray-600">
        Choose a template to start creating your HOA-themed meme.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {templates.map((tpl) => (
          <MemeCard key={tpl.id} template={tpl} />
        ))}
      </div>
    </div>
  );
}
