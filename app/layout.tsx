"use client";

import '../styles/globals.css';
import { ReactNode, useEffect, useState } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <html lang="en">
      <head>
        <title>My Portfolio</title>
        <meta name="description" content="Software Engineering Student Portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <header className={`fixed top-0 left-0 w-full z-50 ${isScrolled ? 'bg-blur' : 'bg-white shadow-md'}`}>
          <nav className="flex justify-between items-center p-5">
            <a href="#home" className="text-xl font-bold font-mono whitespace-pre-wrap">My Portfolio</a>
            <div className="space-x-5">
              <a href="#about" className="nav-link text-sm font-medium font-mono whitespace-pre-wrap">About</a>
              <a href="#projects" className="nav-link text-sm font-medium font-mono whitespace-pre-wrap">Projects</a>
              <a href="#contact" className="nav-link text-sm font-medium font-mono whitespace-pre-wrap">Contact</a>
            </div>
          </nav>
        </header>
        <main className="mt-20">{children}</main>
        <footer className="py-10 bg-black text-white text-center font-mono whitespace-pre-wrap">
          <p>&copy; 2024 My Portfolio. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
};

export default Layout;
