import { prisma } from "@/lib/prisma";
import TrendingList from "@components/trending/TrendingList";
import EmptyState from "@components/ui/EmptyState";
import ErrorState from "@components/ui/ErrorState";

export default async function TrendingPage() {
  try {
    const items = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            screenName: true,
            avatarUrl: true,
          },
        },
      },
      take: 20,
    });

    if (!items || items.length === 0) {
      return (
        <EmptyState
          title="No Trending Posts"
          message="Check back soon for what's rising."
        />
      );
    }

    return (
      <div className="p-4">
        <TrendingList items={items} />
      </div>
    );
  } catch {
    return <ErrorState message="Failed to load trending posts." />;
  }
}

