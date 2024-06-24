import { useState } from 'react';
import { useRouter } from 'next/router';
import { FaExclamationCircle } from 'react-icons/fa';
import styles from './Auth.module.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError(''); // Reset error when user starts typing
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError(''); // Reset error when user starts typing
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Registration failed:', errorData.message);
        setError(errorData.message);
        return;
      }

      alert('User registered');
      router.push('/login'); // Redirect to login page after successful registration
    } catch (error) {
      console.error('An unexpected error occurred:', error);
      setError('An unexpected error occurred');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Register</h2>
      <form onSubmit={handleRegister} className={styles.form}>
        <div className={styles.formGroup}>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email"
            required
            className={`${styles.input} ${error ? styles.inputError : ''}`}
          />
          {error && error.includes('Email') && (
            <div className={styles.errorMessage}>
              <FaExclamationCircle className={styles.errorIcon} />
              {error}
            </div>
          )}
        </div>
        <div className={styles.formGroup}>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password"
            required
            className={`${styles.input} ${error ? styles.inputError : ''}`}
          />
          {error && !error.includes('Email') && (
            <div className={styles.errorMessage}>
              <FaExclamationCircle className={styles.errorIcon} />
              {error}
            </div>
          )}
        </div>
        <button type="submit" className={styles.button}>Register</button>
      </form>
    </div>
  );
};

export default Register;
