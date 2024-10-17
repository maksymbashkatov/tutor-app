'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError('Неверный email или пароль');
    } else {
      // После успешного входа перенаправляем пользователя на главную страницу
      router.push('/');
    }
  };

  return (
    <>
      {error && <p className={styles.error}>{error}</p>}
      <form className={styles.container} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Вход</h1>
        <label className={styles.label}>
          <p>Email:</p>
          <input
            className={styles.input}
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className={styles.label}>
          <p>Пароль:</p>
          <input
            className={styles.input}
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button className={styles.button} type='submit'>Войти</button>
      </form>
    </>
  );
}
