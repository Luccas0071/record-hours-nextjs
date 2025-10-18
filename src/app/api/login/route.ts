import { NextRequest, NextResponse } from "next/server";
import { AuthApi } from "../../../../api/Auth";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  try {
    const authApi = new AuthApi()
    const user = await authApi.login({ email, password });

    // Configurar cookies
    const responseHeaders = new Headers();
    responseHeaders.append(
      "Set-Cookie",
      `access_token=${user.accessToken}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=604800`
    );
    responseHeaders.append(
      "Set-Cookie",
      `refresh_token=${user.refreshToken}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=604800`
    );

    return NextResponse.json({ role: user.role }, { headers: responseHeaders });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Credenciais inválidas" }, { status: 401 });
  }
}