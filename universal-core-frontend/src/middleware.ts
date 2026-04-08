import { NextResponse } from "next/server";

export function middleware(req) {
  const role = req.cookies.get("role")?.value;
  const url = req.nextUrl.pathname;

  // Extract first path segment
  const segment = url.split("/")[1];

  // List of role-protected segments
  const protectedRoles = ["founder", "admin", "advertiser", "vendor"];

  // If the segment is a protected role, enforce access
  if (protectedRoles.includes(segment)) {
    if (role !== segment) {
      return NextResponse.redirect(new URL("/home", req.url));
    }
  }

  return NextResponse.next();
}
