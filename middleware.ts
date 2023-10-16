import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
export default async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  if (req.nextUrl.pathname.startsWith("/cart") && !token) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }
  if (req.nextUrl.pathname.startsWith("/auth") && token) {
    return NextResponse.redirect(new URL("/", req.url));
  }
}
