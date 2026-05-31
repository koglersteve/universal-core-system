import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export function generateSessionToken() {
  return randomBytes(32).toString("hex");
}
