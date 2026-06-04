import { get, patch } from "./httpclient";

export type UserProfile = {
  id: string;
  name: string;
  username: string;
  avatarUrl: string | null;
  bio: string | null;
  trustScore: number;
};

export type ProfilePostsResponse = {
  posts: any[];
};

export async function getProfile(username: string) {
  return get(`/core/profile/${username}`);
}

export async function getProfilePosts(username: string) {
  return get<ProfilePostsResponse>(`/core/profile/${username}/posts`);
}

export async function updateProfile(id: string, values: Partial<UserProfile>) {
  return patch(`/core/profile/${id}`, values);
}

export async function getMyProfile() {
  return get("/core/profile/me");
}
