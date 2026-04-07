"use client";

import React from "react";

interface TemplateSuggestionCardProps {
  template: {
    id: string;
    label: string;
    match?: string[];
  };
  onSelect?: (id: string) => void;
}

export default function TemplateSuggestionCard({
  template,
  onSelect,
}: TemplateSuggestionCardProps) {
  return (
    <div
      className="border rounded-lg p-4 shadow-sm hover:shadow-md transition cursor-pointer bg-white"
      onClick={() => onSelect?.(template.id)}
    >
      <h3 className="font-semibold text-gray-800">{template.label}</h3>

      {template.match && (
        <p class-name="text-xs text-gray-500 mt-1">
          Best for: {template.match.join(", ")}
        </p>
      )}
    </div>
  );
}
