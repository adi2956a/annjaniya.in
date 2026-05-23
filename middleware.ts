import { NextRequest, NextResponse } from "next/server";
import { sessionCookieName, verifySessionToken } from "@/lib/auth";

const protectedRoutes: Record<string, string[]> = {
  "/admin": ["admin"],
  "/officer": ["officer", "admin"],
  "/file-complaint": ["verified", "admin"],
  "/verify": ["member", "verified", "officer", "admin"],
  "/my-complaints": ["member", "verified", "officer", "admin"]
};

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const match = Object.entries(protectedRoutes).find(([route]) =>
    path.startsWith(route)
  );

  if (!match) {
    return NextResponse.next();
  }

  const token = request.cookies.get(sessionCookieName)?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const user = await verifySessionToken(token);
    if (!match[1].includes(user.role)) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } catch {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/officer/:path*", "/file-complaint", "/verify", "/my-complaints"]
};
