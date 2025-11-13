export class AuthApi {
  private base_url: URL

  constructor() {
      this.base_url = new URL(process.env.NEXT_PUBLIC_CONSTRUCTION_MANAGER_API as string)
  }

  async listUser(page: number, limit: number) {
    this.base_url.pathname = '/v1/user';
    const response = await fetch(this.base_url.toString(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEwLCJuYW1lIjoiTHVjYXMgT2xpdmVpcmEgMTIzIiwiZW1haWwiOiJsdWNhc29saXZlaXJhQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbmlzdHJhdG9yIiwiaWF0IjoxNzYyOTk3OTU2LCJleHAiOjE3NjI5OTg4NTZ9.nZeaSopYQEJNmbKqwYvOiFl34Mx7VbPdurNx9uYokbo'
        },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch users: ${response.statusText}`);
    }

    const result = await response.json();
    return result.data;
  }
}

export const authApi = new AuthApi();