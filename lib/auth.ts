import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import type { SessionUser, UserRole } from "@/types";
import type { JWTPayload } from "jose";

const COOKIE_NAME = "anjaniya_session";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 30;

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not configured.");
  }

  return secret;
}

function getJwtKey() {
  return new TextEncoder().encode(getJwtSecret());
}

export async function signSessionToken(user: SessionUser) {
  const payload: JWTPayload = {
    userId: user.userId,
    mobile: user.mobile,
    role: user.role,
    isVerified: user.isVerified,
    displayName: user.displayName
  };

  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_SECONDS}s`)
    .sign(getJwtKey());
}

export async function verifySessionToken(token: string) {
  const { payload } = await jwtVerify(token, getJwtKey());
  return payload as unknown as SessionUser;
}

export function setSessionCookie(token: string) {
  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: SESSION_TTL_SECONDS,
    path: "/"
  });
}

export function clearSessionCookie() {
  cookies().set(COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
    path: "/"
  });
}

export async function getSessionFromCookies() {
  const token = cookies().get(COOKIE_NAME)?.value;
  if (!token) return null;

  try {
    return await verifySessionToken(token);
  } catch {
    return null;
  }
}

export function hasRole(userRole: UserRole, allowedRoles: UserRole[]) {
  return allowedRoles.includes(userRole);
}

export const sessionCookieName = COOKIE_NAME;
