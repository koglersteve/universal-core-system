"use client";

import { useEffect } from "react";
import { useIdlyilyStore } from "./state/useIdlyilyStore";

import TemplateSuggestionCard from "./components/TemplateSuggestionCard";

export default function IdlyilyTemplates() {
  const { templates, fetchTemplates } = useIdlyilyStore();

  useEffect(() => {
    fetchTemplates();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">IDLYILY Templates</h1>

      <p className="text-gray-600">
        Choose a template to guide your emotional reflection.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map((tpl) => (
          <TemplateSuggestionCard key={tpl.id} template={tpl} />
        ))}
      </div>
    </div>
  );
}
