import { get } from "./httpclient";

export type OSState = {
  id: string;
  mode: string;
  updatedAt: number;
  modules: Record<string, any>;
};

export async function getOSState(id: string) {
  return get<OSState>(`/core/os/state/${id}`);
}
