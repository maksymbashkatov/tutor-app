'use client';

import { useState } from 'react';
import styles from './register.module.css';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Логика регистрации будет добавлена позже
  };

  return (
    <>
      {error && <p>{error}</p>}
      <form className={styles.container} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Регистрация</h1>
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
        <label className={styles.label}>
          <p>Подтверждение пароля:</p>
          <input
            className={styles.input}
            type='password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button className={styles.button} type='submit'>Зарегистрироваться</button>
      </form>
    </>
  );
}