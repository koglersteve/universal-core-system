import { LaffLabApi } from "@/lib/LaffLabApi";
import UserProfile from "@/components/user/UserProfile";

const USERNAME = "me"; // TODO: replace with real identity

export default async function ProfilePostsPage() {
  const profile = await LaffLabApi.getProfile(USERNAME);
  const posts = await LaffLabApi.getProfilePosts(USERNAME);

  return (
    <div className="max-w-xl mx-auto">
      <UserProfile profile={profile} posts={posts} />
    </div>
  );
}
