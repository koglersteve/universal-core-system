import { getProfile, getProfilePosts } from "@/lib/api/profile";

export const dynamic = "force-dynamic";

export default async function ProfilePage({ params }) {
  const username = params.username;

  const profile = await getProfile(username);
  const postsData = await getProfilePosts(username);

  const posts = Array.isArray(postsData.posts) ? postsData.posts : [];

  return (
    <div style={{ padding: 24 }}>
      <h1>@{username}</h1>

      <h2>Profile</h2>
      <pre>{JSON.stringify(profile, null, 2)}</pre>

      <h2>Posts</h2>
      {posts.length === 0 && (
        <p style={{ opacity: 0.6 }}>No posts found.</p>
      )}

      {posts.map((post) => (
        <div
          key={post.id}
          style={{
            padding: 16,
            marginBottom: 16,
            background: "#fff",
            borderRadius: 12,
          }}
        >
          <pre>{JSON.stringify(post, null, 2)}</pre>
        </div>
      ))}
    </div>
  );
}
