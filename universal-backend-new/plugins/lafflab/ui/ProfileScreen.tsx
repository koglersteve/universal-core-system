import React, { useEffect, useState } from "react";
import { ReactionBar } from "./ReactionBar";
import { FollowButton } from "./FollowButton";

type Props = {
  username: string;
  onClose?: () => void;
};

type Profile = {
  id: string;
  username: string;
  displayName: string;
  avatarUrl?: string | null;
  bio?: string | null;
  followerCount: number;
  followingCount: number;
  isFollowing: boolean;
};

type ProfilePost = {
  id: string;
  authorId: string;
  text: string;
  type: "text" | "image" | "video" | "audio";
  mediaUrl?: string | null;
  mediaDurationSeconds?: number | null;
  createdAt: string;
  reactions: {
    laugh: number;
    smile: number;
    expressionless: number;
    shock: number;
    mindblown: number;
    angry: number;
    crickets: number;
  };
  viewerReaction: any;
};

export const ProfileScreen: React.FC<Props> = ({ username, onClose }) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [posts, setPosts] = useState<ProfilePost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [profileRes, postsRes] = await Promise.all([
          fetch(`/core/profile/${encodeURIComponent(username)}`),
          fetch(`/core/profile/${encodeURIComponent(username)}/posts`),
        ]);

        const profileData = await profileRes.json();
        const postsData = await postsRes.json();

        if (profileRes.ok) {
          setProfile({
            id: profileData.profile.id,
            username: profileData.profile.username,
            displayName: profileData.profile.displayName,
            avatarUrl: profileData.profile.avatarUrl,
            bio: profileData.profile.bio,
            followerCount: profileData.profile.followerCount,
            followingCount: profileData.profile.followingCount,
            isFollowing: profileData.profile.isFollowing,
          });
        }

        if (postsRes.ok) {
          setPosts(postsData.posts || []);
        }
      } catch (err) {
        console.error("Failed to load profile", err);
      }
      setLoading(false);
    };

    load();
  }, [username]);

  if (loading) return <p>Loading profile…</p>;

  if (!profile) return <p>Profile not found.</p>;

  return (
    <div style={{ padding: 16 }}>
      <div style={{ marginBottom: 12, display: "flex", alignItems: "center", gap: 12 }}>
        {onClose && (
          <button onClick={onClose} style={{ marginRight: 8 }}>
            ← Back
          </button>
        )}

        {profile.avatarUrl && (
          <img
            src={profile.avatarUrl}
            alt={profile.username}
            style={{ width: 48, height: 48, borderRadius: "50%" }}
          />
        )}

        <div>
          <div style={{ fontWeight: "bold" }}>{profile.displayName}</div>
          <div>@{profile.username}</div>
          {profile.bio && (
            <div style={{ fontSize: 12, color: "#555", marginTop: 4 }}>
              {profile.bio}
            </div>
          )}
        </div>
      </div>

      <div style={{ marginBottom: 12 }}>
        <FollowButton
          username={profile.username}
          initialFollowing={profile.isFollowing}
          initialFollowerCount={profile.followerCount}
        />
        <div style={{ fontSize: 12, color: "#555", marginTop: 4 }}>
          Following {profile.followingCount}
        </div>
      </div>

      <h3 style={{ marginBottom: 8 }}>Posts</h3>

      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        <div>
          {posts.map(post => (
            <div
              key={post.id}
              style={{
                border: "1px solid #ddd",
                padding: 12,
                borderRadius: 8,
                marginBottom: 16,
              }}
            >
              <div style={{ marginBottom: 8 }}>{post.text}</div>

              {post.mediaUrl && (
                <div style={{ marginBottom: 8 }}>
                  {post.type === "image" && (
                    <img
                      src={post.mediaUrl}
                      style={{ width: "100%", borderRadius: 8 }}
                    />
                  )}

                  {post.type === "video" && (
                    <video
                      src={post.mediaUrl}
                      controls
                      style={{ width: "100%", borderRadius: 8 }}
                    />
                  )}

                  {post.type === "audio" && (
                    <audio src={post.mediaUrl} controls />
                  )}
                </div>
              )}

              <ReactionBar post={post as any} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
