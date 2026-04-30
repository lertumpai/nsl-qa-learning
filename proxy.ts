import { NextRequest, NextResponse } from "next/server";

const SESSION_COOKIE = "qa_session_id";
const PROTECTED = ["/learn", "/level", "/lesson"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = PROTECTED.some((prefix) => pathname.startsWith(prefix));
  if (!isProtected) return NextResponse.next();

  const session = request.cookies.get(SESSION_COOKIE)?.value;
  if (!session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/learn", "/learn/:path*", "/level/:path*", "/lesson/:path*"],
};
