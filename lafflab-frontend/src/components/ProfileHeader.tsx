"use client";

import Link from "next/link";
import FollowButton from "./FollowButton";

export default function ProfileHeader({
  user,
  stats,
  isOwnProfile,
  initialFollowing,
}: {
  user: {
    id: string;
    username: string | null;
    screenName: string | null;
    avatarUrl: string | null;
    bio: string | null;
  };
  stats: {
    followers: number;
    following: number;
    posts: number;
  };
  isOwnProfile: boolean;
  initialFollowing: boolean;
}) {
  return (
    <div className="w-full bg-black text-white border-b border-white/10">
      {/* Banner */}
      <div className="h-32 w-full bg-gradient-to-r from-blue-700 to-purple-700" />

      {/* Avatar + Info */}
      <div className="px-6 -mt-12 flex items-end gap-4">
        <img
          src={user.avatarUrl || "/default-avatar.png"}
          className="w-24 h-24 rounded-full border-4 border-black object-cover"
        />

        <div className="flex-1">
          <div className="text-2xl font-semibold">{user.screenName}</div>
          <div className="text-white/60">@{user.username}</div>
        </div>

        {!isOwnProfile && (
          <FollowButton
            userId={user.id}
            initialFollowing={initialFollowing}
          />
        )}
      </div>

      {/* Bio */}
      {user.bio && (
        <div className="px-6 mt-4 text-white/90">{user.bio}</div>
      )}

      {/* Stats */}
      <div className="px-6 py-4 flex gap-6 text-sm text-white/80">
        <Link href={`/user/${user.id}/followers`} className="hover:text-white">
          <strong className="text-white">{stats.followers}</strong> Followers
        </Link>

        <Link href={`/user/${user.id}/following`} className="hover:text-white">
          <strong className="text-white">{stats.following}</strong> Following
        </Link>

        <div>
          <strong className="text-white">{stats.posts}</strong> Posts
        </div>
      </div>
    </div>
  );
}
