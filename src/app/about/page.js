"use client";

import { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';
import CommentSection from '../../components/CommentSection';
import styles from './about.module.css';

const About = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Invalid token', error);
        setIsAuthenticated(false);
      }
    }
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>About Us</h1>
      <p className={styles.intro}>
        Welcome to our about page! At our website, we aim to provide the best information and community discussions around important topics.
      </p>
      <CommentSection isAuthenticated={isAuthenticated} />
    </div>
  );
};

export default About;
