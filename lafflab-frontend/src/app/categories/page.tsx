export const dynamic = "force-dynamic";

"use client";

import { useEffect, useState } from "react";
import { LaffLabApi } from "@/lib/api";
import type { Category } from "@/types/category";
import Link from "next/link";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]); // ✅ FIXED

  useEffect(() => {
    async function load() {
      const data = await LaffLabApi.getCategories();
      setCategories(data);
    }
    load();
  }, []);

  return (
    <div className="space-y-4">
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={`/categories/${cat.id}`}
          className="block p-4 rounded-2xl bg-white shadow-md border border-brand-yellow/40 text-black"
        >
          {cat.name}
        </Link>
      ))}
    </div>
  );
}
