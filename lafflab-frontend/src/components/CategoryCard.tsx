"use client";

import Link from "next/link";

type Category = {
  id: string;
  name: string;
  description?: string;
};

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <Link href={`/categories/${category.id}`} className="block text-white">
      <div className="rounded-lg border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition cursor-pointer">
        <h3 className="text-lg font-semibold">{category.name}</h3>

        {category.description && (
          <p className="text-sm text-white/60 mt-1">
            {category.description}
          </p>
        )}
      </div>
    </Link>
  );
}
