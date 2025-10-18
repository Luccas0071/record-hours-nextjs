import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAuth = request.cookies.get("access_token")?.value;

  // Se já está logado, não deixa acessar login/register
  if ((pathname === "/login" || pathname === "/register") && isAuth) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (
    (
      pathname.startsWith("/administrator") || 
      pathname.startsWith("/collaborator")|| 
      pathname === "/"
    ) 
     && !isAuth ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/administrator/:path*",
    "/collaborator/:path*",
    "/login",
    "/register",
  ],
};
