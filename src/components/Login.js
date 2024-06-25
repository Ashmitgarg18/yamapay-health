import { useState } from 'react';
import { useRouter } from 'next/router';
import { FaExclamationCircle } from 'react-icons/fa';
import Link from 'next/link';
import styles from './Auth.module.css'; // Import the CSS module

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        router.push('/about');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
      setError('An unexpected error occurred');
    }
  };

  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.title}>Login</h2>
        <form onSubmit={handleLogin} className={styles.form} noValidate>
          <div className={styles.formGroup}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className={styles.input}
            />
          </div>
          {error && (
            <div className={styles.error}>
              <FaExclamationCircle className={styles.errorIcon} />
              {error}
            </div>
          )}
          <button type="submit" className={styles.button}>Login</button>
        </form>
      </div>
      <p className={styles.switchAuth}>
        Don't have an account? <Link href="/register">Register here</Link>
      </p>
    </>
  );
};

export default Login;
