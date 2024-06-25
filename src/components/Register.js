import { useState } from 'react';
import { useRouter } from 'next/router';
import { FaExclamationCircle } from 'react-icons/fa';
import Link from 'next/link';
import styles from './Auth.module.css'; // Import the CSS module

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [serverError, setServerError] = useState(''); // State for server error messages
  const [successMessage, setSuccessMessage] = useState(''); // State for success message
  const router = useRouter();

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    let valid = true;

    if (!validateEmail(email)) {
      setEmailError('Invalid email address');
      valid = false;
    } else {
      setEmailError('');
    }

    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (!valid) {
      return;
    }

    try {
      const response = await fetch('/api/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.message === 'Email already exists') {
          setEmailError('Email already exists');
        } else {
          setServerError('Registration failed');
        }
        return;
      }

      setSuccessMessage('User registered successfully! Redirecting to login...');
      setTimeout(() => {
        router.push('/login');
      }, 2000); // 2 seconds delay before redirecting
    } catch (error) {
      console.error('An unexpected error occurred:', error);
      setServerError('An unexpected error occurred');
    }
  };

  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.title}>Register</h2>
        <form onSubmit={handleRegister} className={styles.form} noValidate>
          <div className={styles.formGroup}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className={`${styles.input} ${emailError ? styles.error : ''}`}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className={`${styles.input} ${passwordError ? styles.error : ''}`}
            />
            {passwordError && (
              <div className={styles.error}>
                <FaExclamationCircle className={styles.errorIcon} />
                {passwordError}
              </div>
            )}
          </div>
          {serverError && (
            <div className={styles.error}>
              <FaExclamationCircle className={styles.errorIcon} />
              {serverError}
            </div>
          )}
          <button type="submit" className={styles.button}>Register</button>
        </form>
      </div>
      {successMessage && <div className={styles.success}>{successMessage}</div>}
      <p className={styles.switchAuth}>
        Already have an account? <Link href="/login">Sign in here</Link>
      </p>
    </>
  );
};

export default Register;
