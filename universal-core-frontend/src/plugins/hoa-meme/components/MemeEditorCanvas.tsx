"use client";

import React from "react";
import { MemeTemplate } from "../types";
import { useHoaMemeStore } from "../state/useHoaMemeStore";

export default function MemeEditorCanvas({
  template,
}: {
  template: MemeTemplate;
}) {
  const { editState, updateEditState } = useHoaMemeStore();

  return (
    <div className="space-y-4">
      <div className="relative w-full max-w-md mx-auto">
        <img
          src={template.imageUrl}
          alt={template.name}
          className="w-full rounded-lg shadow"
        />

        {/* Top text */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 text-white font-bold text-lg drop-shadow">
          {editState.topText}
        </div>

        {/* Bottom text */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-white font-bold text-lg drop-shadow">
          {editState.bottomText}
        </div>
      </div>

      <div className="space-y-2">
        <input
          type="text"
          placeholder="Top text"
          value={editState.topText}
          onChange={(e) => updateEditState({ topText: e.target.value })}
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          placeholder="Bottom text"
          value={editState.bottomText}
          onChange={(e) => updateEditState({ bottomText: e.target.value })}
          className="w-full border p-2 rounded"
        />
      </div>
    </div>
  );
}
