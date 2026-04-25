"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface LafflabCategory {
  id: string;
  name: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<LafflabCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("Failed to load categories", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return <div className="p-6 text-lg">Loading categories…</div>;
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Categories</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/categories/${cat.id}`}
            className="p-4 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <div className="text-lg font-semibold">{cat.name}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
