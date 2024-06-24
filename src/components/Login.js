// src/components/Login.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import { FaExclamationCircle } from 'react-icons/fa';
import styles from './Auth.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');
    setError('');

    if (!validateEmail(email)) {
      setEmailError('Invalid email address');
      return;
    }

    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      return;
    }

    try {
      const response = await fetch('/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        alert('User logged in');
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
    <div className={styles.container}>
      <h2 className={styles.title}>Login</h2>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <div className={styles.formGroup}>
          <input
            type="email"
            placeholder="Email"
            className={`${styles.input} ${emailError ? styles.error : ''}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {emailError && (
            <div className={styles.error}>
              <FaExclamationCircle className={styles.errorIcon} />
              {emailError}
            </div>
          )}
        </div>
        <div className={styles.formGroup}>
          <input
            type="password"
            placeholder="Password"
            className={`${styles.input} ${passwordError ? styles.error : ''}`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {passwordError && (
            <div className={styles.error}>
              <FaExclamationCircle className={styles.errorIcon} />
              {passwordError}
            </div>
          )}
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
  );
};

export default Login;
