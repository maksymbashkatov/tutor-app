'use client'

import Link from 'next/link';
import styles from './header.module.css';

export default function Header() {
  const isAuthenticated = true; // Позже заменить на реальную проверку
  const user = {
    login: 'johnwinch',
    name: 'John',
    surname: 'Winchester',
  };
  const fullName = `${user.name} ${user.surname}`.trim();
  const displayName = fullName ? fullName : user.login;

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          Tutor-App
        </Link>
      </div>
      <div className={styles.userSection}>
        {isAuthenticated ? (
          <>
            <span>{displayName}</span>
            <img
              src='/default-avatar.png'
              alt='User Avatar'
              className={styles.avatar}
              onClick={() => console.log('Go to profile')}
            />
            <button onClick={() => console.log('Logout')}>Выйти</button>
          </>
        ) : (
          <Link href="/login">
            Вход
          </Link>
        )}
      </div>
    </header>
  );
}