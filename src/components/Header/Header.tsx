'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { easing } from '@/lib/animations';
import TransitionLink from '@/components/TransitionLink/TransitionLink';
import styles from './Header.module.scss';

interface HeaderProps {
  show: boolean;
}

const NAV_ITEMS = [
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Header({ show }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 80);

      if (currentY < 80) {
        setVisible(true);
      } else {
        setVisible(currentY < lastScrollY.current);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <AnimatePresence>
        {show && (
          <motion.header
            className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: visible || menuOpen ? 0 : -100, opacity: 1 }}
            transition={{ duration: 0.4, ease: easing.luxury }}
          >
            <div className={styles.inner}>
              <div className={styles.spacer} />

              {/* Logo */}
              <TransitionLink href="/" className={styles.logo}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/brand/logo.svg" alt="Grey Door" className={styles.logoImg} />
              </TransitionLink>

              {/* Menu button */}
              <button
                className={`${styles.menuBtn} ${menuOpen ? styles.menuOpen : ''}`}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
              >
                <span className={styles.menuLine} />
                <span className={styles.menuLine} />
              </button>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Full-screen nav overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className={styles.navOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: easing.smooth }}
          >
            <div className={styles.navContent}>
              {NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{
                    duration: 0.7,
                    ease: easing.luxury,
                    delay: 0.15 + i * 0.08,
                  }}
                >
                  <TransitionLink
                    href={item.href}
                    className={styles.navLink}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </TransitionLink>
                </motion.div>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
