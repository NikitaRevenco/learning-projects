import credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { render } from "@react-email/components";
import github from "next-auth/providers/github";
import resend from "next-auth/providers/resend";
import env from "@/lib/schema/env";
import nextAuth from "next-auth";
import bcrypt from "bcryptjs";

import MagicLinkEmail from "./emails/magic-link";
import db from "./prisma";

export const {
  handlers: { POST, GET },
  signOut,
  signIn,
  auth,
} = nextAuth({
  providers: [
    resend({
      sendVerificationRequest: async (params) => {
        const { identifier: to, provider, url } = params;
        const { host } = new URL(url);
        const res = await fetch("https://api.resend.com/emails", {
          body: JSON.stringify({
            text: ({ host, url }: { host: string; url: string }) => {
              return `Sign in to ${host}\n${url}\n\n`;
            },
            html: render(MagicLinkEmail({ host, url })),
            subject: `Sign in to ${host}`,
            from: provider.from,
            to,
          }),
          headers: {
            Authorization: `Bearer ${provider.apiKey}`,
            "Content-Type": "application/json",
          },
          method: "POST",
        });

        if (!res.ok)
          throw new Error("Resend error: " + JSON.stringify(await res.json()));
      },
      server: {
        host: {
          auth: {
            pass: env.EMAIL_SERVER_PASSWORD,
            user: env.EMAIL_SERVER_USER,
          },
          host: env.EMAIL_SERVER_HOST,
          port: env.EMAIL_SERVER_PORT,
        },
      },
      apiKey: env.EMAIL_SERVER_PASSWORD,
      from: env.EMAIL_FROM,
    }),
    github({
      clientSecret: env.AUTH_GITHUB_SECRET,
      clientId: env.AUTH_GITHUB_ID,
    }),
    credentials({
      authorize: async (credentials) => {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }

        const email = credentials.email as string;

        const user = await db.user.findUnique({
          where: {
            email,
          },
        });

        if (user) {
          const isMatch = await bcrypt.compare(
            credentials.password as string,
            user.password as string,
          );
          if (!isMatch) {
            throw new Error("Incorrect password");
          }
        }
        return user;
      },
      credentials: {
        password: {
          label: "Password",
          type: "password",
        },
        email: {
          label: "Email",
          type: "email",
        },
      },
      name: "Credentials",
    }),
  ],
  callbacks: {
    jwt: async ({ token }) => {
      if (!token.sub) return token;

      const existingUser = await db.user.findUnique({
        where: {
          id: token.sub,
        },
      });

      if (!existingUser) return token;

      const existingAccount = await db.account.findUnique({
        where: { id: existingUser.id },
      });

      token.isOAuth = Boolean(existingAccount);
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

      return token;
    },
    session: async ({ session, token }) => {
      const extraUserProperties = {
        isTwoFactorEnabled: token.isTwoFactorEnabled,
        isOAuth: token.isOAuth,
        role: token.role,
        id: token.sub,
      };

      const newUser = Object.assign({}, session.user, extraUserProperties);
      return Object.assign({}, session, { user: newUser });
    },
    signIn: async ({ account, user }) => {
      // Allow OAuth without email verification
      if (account?.provider !== "credentials") {
        return true;
      }

      const existingUser = await db.user.findUnique({ where: { id: user.id } });

      if (
        existingUser?.isTwoFactorEnabled &&
        !db.twoFactorConfirmation.verifyUserTwoFactorById(existingUser.id)
      ) {
        return false;
      }

      // Grant access if email is verified
      return Boolean(existingUser?.emailVerified);
    },
  },
  events: {
    linkAccount: async ({ user }) => {
      await db.user.update({
        data: { emailVerified: new Date() },
        where: { id: user.id },
      });
    },
  },
  pages: {
    newUser: "/register",
    signIn: "/login",
  },
  session: { strategy: "jwt" },
  adapter: PrismaAdapter(db),
});
