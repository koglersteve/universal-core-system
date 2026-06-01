import { get, post, patch } from "./httpclient";

export type UserProfile = {
  id: string;
  name: string;
  username: string;
  avatarUrl: string | null;
  bio: string | null;
  trustScore: number;
};

export async function getProfile(id: string) {
  return get<UserProfile>(`/core/profile/${id}`);
}

export async function updateProfile(id: string, values: Partial<UserProfile>) {
  return patch<UserProfile>(`/core/profile/${id}`, values);
}

export async function getMyProfile() {
  return get<UserProfile>("/core/profile/me");
}
