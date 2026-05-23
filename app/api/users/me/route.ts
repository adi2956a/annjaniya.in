import { getSessionFromCookies } from "@/lib/auth";
import { jsonError } from "@/lib/api";

export async function GET() {
  const user = await getSessionFromCookies();
  if (!user) return jsonError("कृपया पहले लॉगिन करें।", 401);

  return Response.json({ user });
}
