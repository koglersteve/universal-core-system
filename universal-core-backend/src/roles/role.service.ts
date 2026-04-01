import { Role } from "./role.model";

export function isValidRole(role: string): role is Role {
  return ["founder", "admin", "advertiser", "vendor"].includes(role);
}
