import { prisma } from "@/lib/db/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthConfig } from "next-auth";

export default {
  adapter: PrismaAdapter(prisma),
  providers: [],
} satisfies NextAuthConfig;
