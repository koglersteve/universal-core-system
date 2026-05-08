import Link from "next/link";

type Category = {
  id: string;
  name: string;
  description?: string;
};

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const href: `/categories/${string}` = `/categories/${category.id}`;

  return (
    <Link
      href={href}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className="rounded-lg border p-4 hover:shadow-md transition-shadow cursor-pointer">
        <h3 className="text-lg font-semibold">{category.name}</h3>
        {category.description && (
          <p className="text-sm text-gray-600 mt-1">
            {category.description}
          </p>
        )}
      </div>
    </Link>
  );
}
