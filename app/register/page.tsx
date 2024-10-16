'use client';

import { useState } from 'react';
import styles from './register.module.css';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [role, setRole] = useState('');
  const router = useRouter();

  const handleRoleSelect = (selectedRole: string) => {
    setRole(selectedRole);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, confirmPassword, role }),
    });

    const data = await response.json();

    if (response.ok) {
      // Перенаправляем пользователя после успешной регистрации
      router.push('/login');
    } else {
      // Отображаем сообщение об ошибке
      setError(data.error || 'Ошибка регистрации');
    }
  };

  return (
    <>
      {error && <p>{error}</p>}

      {!role && (
        <div className={styles.roleSelection}>
          <h1 className={styles.title}>Кто вы?</h1>
          <div className={styles.cards}>
            <div className={styles.card}>
              <h2>Ученик</h2>
              <p>Зарегистрируйтесь как ученик, чтобы находить репетиторов и 
                получать помощь в учебе.</p>
              <button
                className={styles.button}
                onClick={() => handleRoleSelect('USER')}>Выбрать
              </button>
            </div>
            <div className={styles.card}>
              <h2>Репетитор</h2>
              <p>Зарегистрируйтесь как репетитор, чтобы предлагать свои услуги и 
                помогать ученикам.</p>
              <button
                className={styles.button}
                onClick={() => handleRoleSelect('TUTOR')}>Выбрать
              </button>
            </div>
          </div>
        </div>
      )}

      {role && (
        <form className={styles.container} onSubmit={handleSubmit}>
          <h1 className={styles.title}>
            {role === 'TUTOR' ? 'Регистрация репетитора' : 'Регистрация ученика'}
          </h1>
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
      )}
    </>
  );
}