import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/server/user";
import ProfileHeader from "@/components/ProfileHeader";
import ProfileTabs from "@/components/ProfileTabs";
import { isFollowing } from "@/lib/server/follow";

export default async function Page({ params }: { params: { id: string } }) {
  const profile = await prisma.user.findUnique({
    where: { id: params.id },
  });

  if (!profile) {
    return <div className="p-6 text-white">User not found.</div>;
  }

  const { user } = await getUser();

  const [followers, following, posts] = await Promise.all([
    prisma.follow.count({ where: { followingId: profile.id } }),
    prisma.follow.count({ where: { followerId: profile.id } }),
    prisma.post.count({ where: { userId: profile.id } }),
  ]);

  const followingState =
    user && user.id !== profile.id
      ? await isFollowing(user.id, profile.id)
      : false;

  return (
    <div className="min-h-screen bg-black text-white">
      <ProfileHeader
        user={profile}
        stats={{ followers, following, posts }}
        isOwnProfile={user?.id === profile.id}
        initialFollowing={followingState}
      />

      <ProfileTabs id={profile.id} />

      <div className="p-6 text-white/70">
        User posts will render here.
      </div>
    </div>
  );
}
