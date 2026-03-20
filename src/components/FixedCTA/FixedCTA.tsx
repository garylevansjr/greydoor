'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { easing } from '@/lib/animations';
import TransitionLink from '@/components/TransitionLink/TransitionLink';
import styles from './FixedCTA.module.scss';

interface FixedCTAProps {
  show: boolean;
}

export default function FixedCTA({ show }: FixedCTAProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={styles.ctaWrapper}
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: easing.luxury, delay: 0.6 }}
        >
          <div className={styles.glassContainer}>
            <TransitionLink href="/contact" className={styles.cta}>
              <svg
                className={styles.chatIcon}
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <span className={styles.ctaText}>Start the Conversation</span>
            </TransitionLink>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
