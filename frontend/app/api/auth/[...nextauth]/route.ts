import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const login = async (credentials: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/signin`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: credentials?.username,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();

  return data;
};

export const authConfig: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: {
          label: "username",
          type: "text",
        },
      },

      async authorize(credentials, req) {
        if (!credentials?.username) return null;
        try {
          const data = await login(credentials);

          return {
            id: data.userId,
            name: data.name,
          };
        } catch (e: any) {
          if (e.message.match("fetch failed")) {
            throw new Error("404");
          } else {
            throw new Error("401");
          }
        }
      },
    }),
  ],
  pages: {
    signIn: "/signIn",
  },
};

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };
