"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface LafflabCategory {
  id: string;
  name: string;
}

export default function CategoryDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [category, setCategory] = useState<LafflabCategory | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/categories/${id}`, { cache: "no-store" });
        const data = await res.json();
        setCategory(data);
      } catch (err) {
        console.error("Failed to load category", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) {
    return <div className="p-6 text-lg">Loading category…</div>;
  }

  if (!category) {
    return <div className="p-6 text-lg">Category not found.</div>;
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">{category.name}</h1>

      <p className="text-gray-600 dark:text-gray-300">
        This is the detail page for <strong>{category.name}</strong>.
      </p>
    </div>
  );
}
