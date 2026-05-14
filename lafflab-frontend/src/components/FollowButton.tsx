"use client";

import { useState } from "react";

export default function FollowButton({
  userId,
  initialFollowing,
}: {
  userId: string;
  initialFollowing: boolean;
}) {
  const [following, setFollowing] = useState(initialFollowing);
  const [loading, setLoading] = useState(false);

  async function toggleFollow() {
    setLoading(true);

    const endpoint = following ? "/api/unfollow" : "/api/follow";

    await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ targetId: userId }),
    });

    setFollowing(!following);
    setLoading(false);
  }

  return (
    <button
      onClick={toggleFollow}
      disabled={loading}
      className={`px-4 py-2 rounded ${
        following ? "bg-gray-700" : "bg-blue-600"
      } disabled:opacity-50`}
    >
      {loading ? "…" : following ? "Following" : "Follow"}
    </button>
  );
}
