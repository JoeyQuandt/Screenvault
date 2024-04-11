import { PrismaAdapter } from '@auth/prisma-adapter';
import {
  PasskeyProvider,
  tenant,
} from '@teamhanko/passkeys-next-auth-provider';
import type { NextAuthOptions } from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import GoogleProvider from 'next-auth/providers/google';

import { prisma } from '@/lib/prisma';

export const authOptions = {
  providers: [
    // GitHubProvider({
    //   clientId: process.env.GITHUB_ID!,
    //   clientSecret: process.env.GITHUB_SECRET_ID!,
    //   allowDangerousEmailAccountLinking: true,
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
    PasskeyProvider({
      tenant: tenant({
        apiKey: process.env.PASSKEYS_API_KEY!,
        tenantId: process.env.NEXT_PUBLIC_PASSKEYS_TENANT_ID!,
      }),
      async authorize({ userId }) {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) return null;
        return user;
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  callbacks: {
    session: ({ session, token }) => {
      if (token) {
        return {
          ...session,
          user: {
            ...session.user,
            id: token.sub,
          },
        };
      } else {
        return session;
      }
    },
  },
} satisfies NextAuthOptions;
