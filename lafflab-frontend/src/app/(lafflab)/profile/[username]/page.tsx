import { LaffLabApi } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function ProfilePage({ params }) {
  const username = params.username;

  const profile = await LaffLabApi.getProfile(username);
  const posts = await LaffLabApi.getProfilePosts(username);

  return (
    <div style={{ padding: 24 }}>
      <h1>@{username}</h1>

      <pre>{JSON.stringify(profile, null, 2)}</pre>

      <h2>Posts</h2>
      <pre>{JSON.stringify(posts, null, 2)}</pre>
    </div>
  );
}
