import { LaffLabApi } from "@/lib/api";

export async function getProfile(id: string) {
  return LaffLabApi.rawGet(`/core/profile/${id}`);
}

export async function updateProfile(id: string, values: any) {
  return LaffLabApi.rawPost(`/core/profile/${id}`, values);
}
