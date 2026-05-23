import { LaffLabApi } from "@/lib/LaffLabApi";
import UserProfile from "@/components/user/UserProfile";

export default async function ProfilePostsPage() {
  const username = "me"; // TODO: replace with real session username

  const profile = await LaffLabApi.getProfile(username);
  const posts = await LaffLabApi.getProfilePosts(username);

  return (
    <div className="max-w-xl mx-auto">
      <UserProfile profile={profile} posts={posts} />
    </div>
  );
}
