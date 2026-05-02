"use client";

import { useEffect, useState } from "react";
import { LaffLabApi } from "@/lib/api";
import type { Category } from "@/types/category";
import Link from "next/link";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await LaffLabApi.getCategories();
      setCategories(data);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Categories</h1>

      {loading && <p>Loading…</p>}

      <div className="space-y-3">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/categories/${cat.id}`}
            className="block p-4 border rounded bg-white shadow-sm"
          >
            {cat.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
