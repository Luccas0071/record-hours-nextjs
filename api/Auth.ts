// import { cookies } from "next/headers";
// import { setCookie } from "../actions/Auth.action";

export class AuthApi {
  private base_url: URL

  constructor() {
      this.base_url = new URL(process.env.NEXT_PUBLIC_CONSTRUCTION_MANAGER_API as string)
  }

  async login(payload: { email: string, password: string}) {
    this.base_url.pathname = '/v1/login';
    const result = await fetch(this.base_url.toString(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    // if (!result.ok) throw new Error('Erro ao realizar login');
    const user = await result.json();

    // const cookieStoreOne = await cookies();
    // cookieStoreOne.set({
    //   name: 'refresh_token',
    //   value: user.refreshToken,
    //   path: '/',
    //   secure: process.env.NODE_ENV === 'production',
    //   httpOnly: true,
    //   sameSite: 'lax',
    //   maxAge: 60 * 60 * 24 * 7,
    // });

    // const cookieStoreTwo = await cookies();
    // cookieStoreTwo.set({
    //   name: "access_token",
    //   value: user.accessToken,
    //   path: '/',
    //   secure: process.env.NODE_ENV === 'production',
    //   httpOnly: true,
    //   sameSite: 'lax',
    //   maxAge: 60 * 60 * 24 * 7,
    // });
    
    // console.log("user Segundo =>")
    // console.log(user)
    // console.log('a')
    // setCookie("access_token", user.accessToken)
    // console.log('b')
    // setCookie("refresh_token", user.refreshToken)
    // console.log('c')

    return user;
  }
}

export const authApi = new AuthApi();