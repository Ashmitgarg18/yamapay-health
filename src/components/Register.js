// src/components/Register.js
import { useState } from 'react';
import styles from './Auth.module.css'; // Import the CSS module

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Registration failed:', errorData.message);
        alert('Registration failed');
        return;
      }

      alert('User registered');
    } catch (error) {
      console.error('An unexpected error occurred:', error);
      alert('An unexpected error occurred');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Register</h2>
      <form onSubmit={handleRegister} className={styles.form}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
          className={styles.input}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Register</button>
      </form>
    </div>
  );
};

export default Register;
