"use client"; // Mark this as a client component

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import NavBar from '../components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../public/css/styles.css';

const Home = () => {
  const [content, setContent] = useState('');
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const loadContent = async (test) => {
    const res = await fetch(`/data/${test}.html`);
    const text = await res.text();
    setContent(text);
  };

  useEffect(() => {
    const test = searchParams.get('test') || 'bmp';
    loadContent(test);
  }, [pathname, searchParams]);

  return (
    <div className="container">
      <h1 className="heading my-4">Top 10 Health Tests</h1>
      <div className="text-center mb-4">
        <Link href="/about" className="about-link">
          About Us
        </Link>
      </div>
      <NavBar />
      <div className="tab-content" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default Home;
