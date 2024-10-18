import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email }
        });
        
        if (user && await bcrypt.compare(credentials?.password || '', user.password)) {
          return {
            id: user.id.toString(),
            email: user.email,
            role: user.role,
            name: user.name || '',
            surname: user.surname || '',
          };
        } else {
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.name = user.name;
        token.surname = user.surname;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role as string;
      session.user.name = token.name || '';
      session.user.surname = token.surname as string || '';
      return session;
    }
  },
  pages: {
    signIn: '/login',
    signOut: '/logout',
    error: '/auth/error',
  }
};