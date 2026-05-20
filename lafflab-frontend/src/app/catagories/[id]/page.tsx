import { notFound } from "next/navigation";
import Link from "next/link";

interface CategoryPageProps {
  params: {
    id: string;
  };
}

async function getCategory(id: string) {
  // Placeholder fetch until backend is wired
  // Replace with your real API call
  return {
    id,
    name: `Category ${id}`,
    description: "This is a placeholder category description.",
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = await getCategory(params.id);

  if (!category) {
    notFound();
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">{category.name}</h1>
      <p className="text-gray-700">{category.description}</p>

      <Link
        href="/categories"
        className="text-blue-600 hover:underline"
      >
        Back to Categories
      </Link>
    </div>
  );
}
