import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/server/user";
import StudioHome from "@components/studio/StudioHome";
import ErrorState from "@components/ui/ErrorState";

export default async function StudioPage() {
  try {
    const { user } = await getUser();

    if (!user) {
      return <ErrorState message="You must be logged in to access Creator Studio." />;
    }

    // Example creator dashboard data
    const posts = await prisma.post.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    const data = {
      user,
      stats: {
        totalPosts: posts.length,
      },
      posts,
    };

    return (
      <div className="p-4">
        <StudioHome data={data} />
      </div>
    );
  } catch {
    return <ErrorState message="Failed to load creator studio." />;
  }
}
