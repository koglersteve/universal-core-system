import { get, patch } from "./httpclient";

export type UserProfile = {
  id: string;
  name: string;
  username: string;
  avatarUrl: string | null;
  bio: string | null;
  trustScore: number;
};

// GET /core/profile/{username}
export async function getProfile(username: string) {
  return get(`/core/profile/${username}`);
}

// GET /core/profile/{username}/posts
export async function getProfilePosts(username: string) {
  return get(`/core/profile/${username}/posts`);
}

// PATCH /core/profile/{id}
export async function updateProfile(id: string, values: Partial<UserProfile>) {
  return patch(`/core/profile/${id}`, values);
}

// GET /core/profile/me
export async function getMyProfile() {
  return get("/core/profile/me");
}
