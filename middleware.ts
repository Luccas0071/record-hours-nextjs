import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";
import UserRole from "@/enum/UserRole.enum";

interface TokenPayload {
  sub: number;
  name: string;
  email: string;
  role: string;
}

export function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  const { pathname } = request.nextUrl;

  // 🔒 1. Usuário não autenticado → redireciona para login
  if (!token) {
    if (
      pathname === "/" ||
      pathname.startsWith("/administrator") ||
      pathname.startsWith("/collaborator")
    ) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  // 🧩 2. Decodifica o token
  const decoded = jwtDecode<TokenPayload>(token);
  const userRole = decoded?.role;

  // 🚫 3. Impede acesso cruzado entre roles
  if (pathname.startsWith("/administrator") && userRole === UserRole.USER) {
    return NextResponse.redirect(new URL("/collaborator/dashboard", request.url));
  }
  
  // 🔁 4. Evita que usuários logados acessem login/register
  if ((pathname === "/login" || pathname === "/register")) {
    if (userRole === UserRole.ADMINISTRATOR) {
      return NextResponse.redirect(new URL("/administrator/dashboard", request.url));
    } else if (userRole === UserRole.USER) {
      return NextResponse.redirect(new URL("/collaborator/dashboard", request.url));
    }
  }

  // 🏠 5. Redireciona / para a dashboard certa
  if (pathname === "/") {
    if (userRole === UserRole.ADMINISTRATOR) {
      return NextResponse.redirect(new URL("/administrator/dashboard", request.url));
    } else if (userRole === UserRole.USER) {
      return NextResponse.redirect(new URL("/collaborator/dashboard", request.url));
    }
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
