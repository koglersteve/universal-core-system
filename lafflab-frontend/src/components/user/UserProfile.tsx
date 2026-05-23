"use client";

import PostCard from "@/components/PostCard";

type UserProfileProps = {
  profile: any;
  posts: any[];
};

export default function UserProfile({ profile, posts }: UserProfileProps) {
  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="flex items-center space-x-4">
        <img
          src={profile?.avatarUrl || "/default-avatar.png"}
          alt={profile?.username || "User"}
          className="w-16 h-16 rounded-full object-cover"
        />

        <div>
          <h1 className="text-xl font-semibold">{profile?.username}</h1>
          {profile?.bio && (
            <p className="text-sm text-neutral-500">{profile.bio}</p>
          )}
        </div>
      </div>

      {/* Posts */}
      <div className="space-y-4">
        {posts && posts.length > 0 ? (
          posts.map((post: any) => (
            <PostCard key={post.id} post={post} />
          ))
        ) : (
          <div className="py-8 text-center text-neutral-500 text-sm">
            This user hasn’t posted anything yet.
          </div>
        )}
      </div>
    </div>
  );
}
