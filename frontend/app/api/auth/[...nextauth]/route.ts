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

          const id = data.id;
          const username = data.username;

          return {
            name: data.name,
            id,
            username,
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
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
      }

      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.id = token.id;
        session.username = token.username;
      }

      return session;
    },
  },
  pages: {
    signIn: "/signIn",
  },
};

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };
