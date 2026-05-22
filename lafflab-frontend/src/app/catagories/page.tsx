"use client";

import { useEffect, useState } from "react";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/categories`)
      .then((res) => res.json())
      .then(setCategories);
  }, []);

  return (
    <div className="p-4 space-y-4 text-white">
      <h1 className="text-2xl font-semibold">Categories</h1>

      {categories.map((c: any) => (
        <div
          key={c.id}
          className="p-4 rounded-lg bg-white/5 border border-white/10"
        >
          {c.name}
        </div>
      ))}
    </div>
  );
}
