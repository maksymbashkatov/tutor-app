'use client';

import Link from 'next/link';
import styles from './header.module.css';
import { useSession, signOut } from 'next-auth/react';

export default function Header() {
  const { data: session } = useSession();
  const isAuthenticated = !!session;
  const user = session?.user;

  const displayName = user ? `${user.name} ${user.surname}`.trim() : 'Гость';

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">Tutor-App</Link>
      </div>
      <div className={styles.userSection}>
        {isAuthenticated ? (
          <>
            <span>{displayName ? displayName : user?.email}</span>
            <img
              src='/default-avatar.png'
              alt='User Avatar'
              className={styles.avatar}
              onClick={() => console.log('Go to profile')}
            />
            <button onClick={() => signOut()}>Выйти</button>
          </>
        ) : (
          <>
            <span>{displayName}</span>
            <Link href="/login">Вход</Link>
          </>
        )}
      </div>
    </header>
  );
}