
import { env } from "@/env";
import { client } from "@/lib/db";
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  // rateLimit: {
  //   storage: "database"
  // },
  socialProviders: {
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    },
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60, // 1 minutes

    },
  },
  plugins: [nextCookies()],
  database: mongodbAdapter(client),
});