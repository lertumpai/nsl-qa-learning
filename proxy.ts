import { NextRequest, NextResponse } from "next/server";

const SESSION_COOKIE = "qa_session_id";
const SEVEN_DAYS = 60 * 60 * 24 * 7;

export function proxy(request: NextRequest) {
  const existing = request.cookies.get(SESSION_COOKIE);
  if (existing) return NextResponse.next();

  const newSession = crypto.randomUUID();

  // Forward the new cookie into the request headers so RSC pages can read it
  const requestHeaders = new Headers(request.headers);
  const existingCookies = request.headers.get("cookie") ?? "";
  requestHeaders.set(
    "cookie",
    existingCookies ? `${existingCookies}; ${SESSION_COOKIE}=${newSession}` : `${SESSION_COOKIE}=${newSession}`
  );

  const response = NextResponse.next({ request: { headers: requestHeaders } });

  response.cookies.set(SESSION_COOKIE, newSession, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SEVEN_DAYS,
    path: "/",
  });

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
