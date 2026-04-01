import { NextResponse } from "next/server";

export function middleware(req) {
  const role = req.cookies.get("role")?.value;
  const url = req.nextUrl.pathname;

  // Extract the first segment of the path: "/founder/settings" → "founder"
  const segment = url.split("/")[1];

  // If the segment matches a role name, enforce it
  if (segment && role && segment !== "" && segment === segment.toLowerCase()) {
    // If the user tries to access a role‑protected route they don't belong to
    if (segment !== role) {
      return NextResponse.redirect(new URL("/home", req.url));
    }
  }

  return NextResponse.next();
}
