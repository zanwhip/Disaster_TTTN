export interface APIUser {
  id: string;
  username: string;
  email: string;
  accessToken: string;
}

declare module "next-auth" {
  interface Session {
    accessToken: string;
    user: APIUser;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    user: APIUser;
  }
}


export interface LoginData {
  username: string;
  password: string;
}

export interface AuthResponse {
  id: number;
  username: string;
  email?: string;
  token: string;
}
