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

    return await result.json();
  }
}

export const authApi = new AuthApi();