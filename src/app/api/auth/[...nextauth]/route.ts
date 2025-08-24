import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { APIUser } from "@/types/next-auth";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<APIUser | null> {
        if (!credentials?.username || !credentials.password) return null;

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}auth/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: credentials.username,
              password: credentials.password,
            }),
          }
        );
        const data = await res.json();
        if (!res.ok || !data.accessToken) {
          return null;
        }

        const user: APIUser = {
          id: data.id.toString(),
          username: data.username,
          email: data.email,
          accessToken: data.accessToken,
        };

        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const u = user as unknown as APIUser;
        token.accessToken = u.accessToken;
        token.user = u;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.user = token.user as APIUser;
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
