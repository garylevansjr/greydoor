'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { easing } from '@/lib/animations';
import TransitionLink from '@/components/TransitionLink/TransitionLink';
import styles from './Footer.module.scss';

const NAV_LINKS = [
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <footer ref={ref} className={styles.footer} id="contact">
      <div className={styles.inner}>
        {/* Top section — CTA */}
        <motion.div
          className={styles.ctaSection}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: easing.luxury }}
        >
          <p className={styles.ctaLabel}>Ready to begin?</p>
          <h2 className={styles.ctaHeading}>Let&apos;s Open the Door</h2>
          <p className={styles.ctaBody}>
            Every relationship starts with a conversation.
            Tell us about your life, your needs, and how we can help.
          </p>

          <div className={styles.contactRow}>
            <a href="mailto:hello@greydoor.com" className={styles.contactLink}>
              hello@greydoor.com
            </a>
            <div className={styles.contactDivider} />
            <a href="tel:+17131234567" className={styles.contactLink}>
              (713) 123-4567
            </a>
          </div>

          <TransitionLink href="/contact" className={styles.ctaButton}>
            <span>Start the Conversation</span>
          </TransitionLink>
        </motion.div>

        {/* Hairline divider */}
        <motion.div
          className={styles.divider}
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, ease: easing.reveal, delay: 0.3 }}
        />

        {/* Bottom row */}
        <motion.div
          className={styles.bottomRow}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: easing.smooth, delay: 0.5 }}
        >
          <div className={styles.bottomLeft}>
            <TransitionLink href="/">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/brand/logo.svg"
                alt="Gray Door"
                className={styles.footerLogo}
              />
            </TransitionLink>
          </div>

          <nav className={styles.footerNav}>
            {NAV_LINKS.map((link) => (
              <TransitionLink key={link.label} href={link.href} className={styles.footerLink}>
                {link.label}
              </TransitionLink>
            ))}
          </nav>

          <div className={styles.bottomRight}>
            <p className={styles.location}>Houston, Texas</p>
          </div>
        </motion.div>

        {/* Large Grey Door watermark */}
        <motion.div
          className={styles.watermark}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 0.04, y: 0 } : {}}
          transition={{ duration: 1.2, ease: easing.luxury, delay: 0.6 }}
        >
          Gray Door
        </motion.div>

        {/* Copyright */}
        <motion.p
          className={styles.copyright}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          &copy; {new Date().getFullYear()} Gray Door. All rights reserved.
        </motion.p>
      </div>
    </footer>
  );
}
