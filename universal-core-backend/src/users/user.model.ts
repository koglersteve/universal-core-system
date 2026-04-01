export interface User {
  id: string;
  email: string;
  passwordHash: string;
  role: "founder" | "admin" | "advertiser" | "vendor";
}
