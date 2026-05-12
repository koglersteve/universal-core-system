"use client";

import { useState, useTransition } from "react";

type Props = {
  targetUserId: string;
  initialIsFollowing: boolean;
  initialFollowerCount: number;
};

export default function Component({
  targetUserId,
  initialIsFollowing,
  initialFollowerCount,
}: Props) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [followerCount, setFollowerCount] = useState(initialFollowerCount);
  const [isPending, startTransition] = useTransition();

  function toggleFollow() {
    startTransition(async () => {
      const action = isFollowing ? "unfollow" : "follow";

      const res = await fetch("/api/follow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetUserId, action }),
      });

      if (!res.ok) return;

      const data = await res.json();
      setIsFollowing(data.isFollowing);
      setFollowerCount(data.followerCount);
    });
  }

  return (
    <div className="flex items-center space-x-3">
      <button
        onClick={toggleFollow}
        disabled={isPending}
        className="px-4 py-2 rounded-md bg-white text-black font-semibold hover:bg-gray-200 disabled:opacity-60 disabled:cursor-not-allowed transition"
      >
        {isFollowing ? "Following" : "Follow"}
      </button>
      <div className="text-gray-400 text-sm">
        {followerCount} follower{followerCount === 1 ? "" : "s"}
      </div>
    </div>
  );
}
