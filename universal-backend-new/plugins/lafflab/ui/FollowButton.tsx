import React, { useState } from "react";

type Props = {
  username: string;
  initialFollowing: boolean;
  initialFollowerCount: number;
};

export const FollowButton: React.FC<Props> = ({
  username,
  initialFollowing,
  initialFollowerCount,
}) => {
  const [following, setFollowing] = useState(initialFollowing);
  const [followerCount, setFollowerCount] = useState(initialFollowerCount);
  const [loading, setLoading] = useState(false);

  const toggleFollow = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const res = await fetch(`/core/follow/${encodeURIComponent(username)}`, {
        method: "POST",
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Follow error:", data);
      } else {
        setFollowing(data.following);
        setFollowerCount(data.followerCount);
      }
    } catch (err) {
      console.error("Follow toggle failed:", err);
    }

    setLoading(false);
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <button onClick={toggleFollow} disabled={loading}>
        {following ? "Unfollow" : "Follow"}
      </button>
      <span style={{ fontSize: 12, color: "#555" }}>
        {followerCount} follower{followerCount === 1 ? "" : "s"}
      </span>
    </div>
  );
};
