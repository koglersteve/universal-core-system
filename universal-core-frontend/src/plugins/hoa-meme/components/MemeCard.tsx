"use client";

import React from "react";
import Link from "next/link";
import { MemeTemplate } from "../types";
import { useHoaMemeStore } from "../state/useHoaMemeStore";

export default function MemeCard({ template }: { template: MemeTemplate }) {
  const { selectTemplate } = useHoaMemeStore();

  return (
    <Link
      href="/plugins/hoa-meme/editor"
      onClick={() => selectTemplate(template)}
      className="block border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
    >
      <img
        src={template.imageUrl}
        alt={template.name}
        className="w-full h-32 object-cover"
      />

      <div className="p-2 font-medium text-gray-800">
        {template.name}
      </div>
    </Link>
  );
}
