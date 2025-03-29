import NextAuth from "next-auth";
import { prisma } from "@/lib/db/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./configs";

import Auth0Provider from "next-auth/providers/auth0";

export const handler = NextAuth({
    ...authConfig,
    adapter: PrismaAdapter(prisma),
    secret: process.env.AUTH_SECRET,
    providers: [
       Auth0Provider({
            clientId: process.env.AUTH0_CLIENT_ID as string,
            clientSecret: process.env.AUTH0_CLIENT_SECRET as string,
            issuer: process.env.AUTH0_ISSUER,
       })
    ],
});

export const { handlers, signIn, signOut, auth } = handler;