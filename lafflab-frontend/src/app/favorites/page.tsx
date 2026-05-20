import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/server/user";
import FavoritesList from "@/components/favorites/FavoritesList";

export default async function FavoritesPage() {
  const { user } = await getUser();

  if (!user) {
    return (
      <div className="p-4 text-white/60">
        You must be logged in to view favorites.
      </div>
    );
  }

  const items = await prisma.favorite.findMany({
    where: { userId: user.id },
    include: {
      post: {
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
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-4">
      <FavoritesList items={items.map((f) => f.post)} />
    </div>
  );
}
