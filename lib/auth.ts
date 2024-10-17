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
        // Проверка пользователя в базе данных
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email }
        });

        // Если пользователь найден и пароли совпадают
        if (user && await bcrypt.compare(credentials?.password || '', user.password)) {
          return {
            id: user.id.toString(),
            email: user.email,
            name: user.name,
            surname: user.surname,
          };
        } else {
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: '/login',
    signOut: '/logout',
    error: '/auth/error',
  }
};