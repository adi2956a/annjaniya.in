import { NextResponse } from "next/server";
import { z } from "zod";
import { getSessionFromCookies, hasRole } from "@/lib/auth";
import type { SessionUser, UserRole } from "@/types";

export function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export async function parseJson<T>(request: Request, schema: z.Schema<T>) {
  const body = await request.json();
  return schema.parse(body);
}

export async function requireUser(
  allowedRoles?: UserRole[]
): Promise<SessionUser | NextResponse> {
  const user = await getSessionFromCookies();

  if (!user) {
    return jsonError("कृपया पहले लॉगिन करें।", 401);
  }

  if (allowedRoles && !hasRole(user.role, allowedRoles)) {
    return jsonError("आपको इस कार्य की अनुमति नहीं है।", 403);
  }

  return user;
}
