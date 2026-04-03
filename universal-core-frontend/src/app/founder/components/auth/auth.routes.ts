// Frontend-safe route helpers for authentication flows.

export const authRoutes = {
  login: "/api/auth/login",
  logout: "/api/auth/logout",
  forgotPassword: "/api/auth/forgot",
  resetPassword: (token: string) => `/api/auth/reset/${token}`,
};
