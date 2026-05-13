"use client";

import { useState } from "react";

export default function FollowButton({
  targetUserId,
  initialIsFollowing,
  initialFollowerCount,
}: {
  targetUserId: string;
  initialIsFollowing: boolean;
  initialFollowerCount: number;
}) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [count, setCount] = useState(initialFollowerCount);
  const [loading, setLoading] = useState(false);

  async function toggle() {
    if (loading) return;
    setLoading(true);

    const endpoint = isFollowing ? "/api/unfollow" : "/api/follow";

    await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify({
        followerId: "me",
        followingId: targetUserId,
      }),
    });

    setIsFollowing(!isFollowing);
    setCount((c) => (isFollowing ? c - 1 : c + 1));
    setLoading(false);
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className={`px-4 py-2 rounded-md text-sm font-medium transition ${
        isFollowing
          ? "bg-white/20 text-white hover:bg-white/30"
          : "bg-blue-500 text-white hover:bg-blue-600"
      }`}
    >
      {loading ? "…" : isFollowing ? "Following" : "Follow"} • {count}
    </button>
  );
}
