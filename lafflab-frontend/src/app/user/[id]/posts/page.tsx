import { getProfilePosts } from "@/lib/api/profile";

export const dynamic = "force-dynamic";

export default async function UserPostsPage({ params }) {
  const userId = params.id;

  const data = await getProfilePosts(userId);
  const posts = Array.isArray(data.posts) ? data.posts : [];

  return (
    <div style={{ padding: 24 }}>
      <h1>User {userId} — Posts</h1>

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
