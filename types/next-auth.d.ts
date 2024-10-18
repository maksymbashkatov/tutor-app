import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface User {
    email: string;
    role: string;
    name: string;
    surname: string;
  }

  interface Session {
    user: User & DefaultSession['user'];
  }
}