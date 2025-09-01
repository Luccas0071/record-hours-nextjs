import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAuth = request.cookies.has("userAuth");

  // Se já está logado, não deixa acessar login/register
  if ((pathname === "/login" || pathname === "/register") && isAuth) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Se não está logado e tenta acessar páginas privadas → manda para /login
  const privateRoutes = ["/", "/accounts", "/project", "/report"];
  if (privateRoutes.includes(pathname) && !isAuth) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/accounts/:path*",
    "/project/:path*",
    "/report/:path*",
    "/login",
    "/register",
  ],
};
