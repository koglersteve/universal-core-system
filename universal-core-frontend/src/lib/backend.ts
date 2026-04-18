"use client";

// CLIENT-SIDE BACKEND URL HELPER
// Reads NEXT_PUBLIC_BACKEND_URL from the browser environment.

export function getBackendUrl() {
  return process.env.NEXT_PUBLIC_BACKEND_URL || null;
}
