import { NextResponse } from "next/server";

export function middleware(req) {
  const url = req.nextUrl;

  // Permanent redirect: /feed → /
  if (url.pathname === "/feed") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}
