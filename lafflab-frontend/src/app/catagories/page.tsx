import CategoryCard from "@components/CategoryCard";
import EmptyState from "@components/ui/EmptyState";
import ErrorState from "@components/ui/ErrorState";
import { prisma } from "@/lib/prisma";

export default async function CategoriesPage() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
    });

    if (!categories || categories.length === 0) {
      return <EmptyState title="No Categories" message="Nothing to show yet." />;
    }

    return (
      <div className="grid grid-cols-2 gap-4 p-4">
        {categories.map((cat) => (
          <CategoryCard key={cat.id} category={cat} />
        ))}
      </div>
    );
  } catch {
    return <ErrorState message="Failed to load categories." />;
  }
}
