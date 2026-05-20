import ExploreFeed from "@/components/ExploreFeed";
import { prisma } from "@/lib/prisma";

export default async function ExplorePage() {
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
    take: 50, // explore feed limit
  });

  return (
    <div className="p-4">
      <ExploreFeed items={items} />
    </div>
  );
}
