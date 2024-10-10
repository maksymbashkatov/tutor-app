import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Здесь будет логика для проверки пользователя
        const user = { id: '1', name: 'John', email: 'johnwinch@gmail.com' };

        if (user) {
          return user;
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
    verifyRequest: '/auth/verify-request',
  }
};