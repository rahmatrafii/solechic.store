import { NextResponse } from "next/server";
import { NextRequestWithAuth } from "next-auth/middleware";
export function middleware(request: NextRequestWithAuth) {
  const cookie = request.cookies.get("next-auth.session-token");
  if (request.nextUrl.pathname.startsWith("/cart")) {
    if (!cookie) {
      return NextResponse.redirect(new URL("/auth/signin", request.url));
    }
  }
  if (request.nextUrl.pathname.startsWith("/auth")) {
    if (cookie) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}
