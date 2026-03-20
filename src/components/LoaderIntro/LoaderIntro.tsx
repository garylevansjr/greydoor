'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { easing } from '@/lib/animations';
import DoorIcon from './DoorIcon';
import styles from './LoaderIntro.module.scss';

interface LoaderIntroProps {
  onComplete: () => void;
}

const BRAND_COLORS = ['#68161A', '#1D3B28', '#E8BDD8', '#E2BC31', '#638B48', '#FDE5DD'];
const MIN_LOADER_TIME = 4000;

type LoaderPhase = 'loading' | 'knock' | 'fadeIcon' | 'line' | 'doors' | 'done';

export default function LoaderIntro({ onComplete }: LoaderIntroProps) {
  const [phase, setPhase] = useState<LoaderPhase>('loading');
  const [colorIndex, setColorIndex] = useState(0);
  const [assetsReady, setAssetsReady] = useState(false);
  const timerReady = useRef(false);
  const sequenceStarted = useRef(false);

  // Color cycling for icon
  useEffect(() => {
    if (phase !== 'loading' && phase !== 'knock') return;
    const interval = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % BRAND_COLORS.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [phase]);

  // Minimum timer
  useEffect(() => {
    const timer = setTimeout(() => {
      timerReady.current = true;
      checkReady();
    }, MIN_LOADER_TIME);
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Asset loading check
  useEffect(() => {
    if (document.readyState === 'complete') {
      setAssetsReady(true);
    } else {
      const handler = () => setAssetsReady(true);
      window.addEventListener('load', handler);
      return () => window.removeEventListener('load', handler);
    }
  }, []);

  const startSequence = useCallback(() => {
    if (sequenceStarted.current) return;
    sequenceStarted.current = true;

    // Phase: knock knock
    setPhase('knock');

    // After 1.5s, fade out icon + knock text
    setTimeout(() => setPhase('fadeIcon'), 1500);

    // After icon fades (0.8s), draw line
    setTimeout(() => setPhase('line'), 2400);

    // After line draws (0.5s), open doors
    setTimeout(() => setPhase('doors'), 3000);

    // After doors open, complete
    setTimeout(() => {
      setPhase('done');
      onComplete();
    }, 4300);
  }, [onComplete]);

  const checkReady = useCallback(() => {
    if (timerReady.current && (assetsReady || timerReady.current)) {
      startSequence();
    }
  }, [assetsReady, startSequence]);

  useEffect(() => {
    if (assetsReady) checkReady();
  }, [assetsReady, checkReady]);

  // Also trigger after min time regardless
  useEffect(() => {
    const fallback = setTimeout(() => {
      startSequence();
    }, MIN_LOADER_TIME + 200);
    return () => clearTimeout(fallback);
  }, [startSequence]);

  if (phase === 'done') return null;

  const showIcon = phase === 'loading' || phase === 'knock';
  const iconFading = phase === 'fadeIcon';
  const showDoors = phase === 'line' || phase === 'doors';
  const hideBackground = phase === 'doors';

  return (
    <div className={styles.loader}>
      {/* Solid background — ensures hero is not visible, hidden during door reveal */}
      <motion.div
        className={styles.background}
        animate={{ opacity: hideBackground ? 0 : 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <div className={styles.solidBase} />
        <div className={styles.gradientLayer} />
        {/* Animated hairline lines */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className={styles.hairlineLine}
            style={{
              left: `${15 + i * 18}%`,
            }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{
              scaleY: [0, 1, 1, 0],
              opacity: [0, 0.15, 0.15, 0],
            }}
            transition={{
              duration: 4,
              ease: 'easeInOut',
              repeat: Infinity,
              delay: i * 0.6,
            }}
          />
        ))}
      </motion.div>

      {/* Center content — icon + text */}
      <motion.div
        className={styles.center}
        animate={{
          opacity: iconFading ? 0 : 1,
          scale: iconFading ? 0.92 : 1,
        }}
        transition={{
          duration: 0.8,
          ease: easing.luxury,
        }}
      >
        {/* Inline SVG icon with animated path fills */}
        {(showIcon || iconFading) && (
          <motion.div
            className={styles.iconWrap}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: easing.luxury }}
          >
            <DoorIcon
              color={BRAND_COLORS[colorIndex]}
              className={styles.icon}
            />
          </motion.div>
        )}

        {/* Text */}
        <div className={styles.textWrap}>
          <AnimatePresence mode="wait">
            {phase === 'loading' && (
              <motion.p
                key="loading"
                className={styles.loaderText}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: easing.luxury }}
              >
                loading
              </motion.p>
            )}
            {phase === 'knock' && (
              <motion.p
                key="knock"
                className={styles.loaderText}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: easing.luxury }}
              >
                Knock Knock
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Vertical line — draws during line phase, fades before doors open */}
      <AnimatePresence>
        {phase === 'line' && (
          <motion.div
            className={styles.verticalLine}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: easing.reveal }}
          />
        )}
      </AnimatePresence>

      {/* Door panels — present during line phase (static), animate open during doors phase */}
      {showDoors && (
        <>
          <motion.div
            className={`${styles.doorPanel} ${styles.doorLeft}`}
            animate={{ x: phase === 'doors' ? '-100%' : '0%' }}
            transition={{ duration: 1.2, ease: easing.reveal }}
          />
          <motion.div
            className={`${styles.doorPanel} ${styles.doorRight}`}
            animate={{ x: phase === 'doors' ? '100%' : '0%' }}
            transition={{ duration: 1.2, ease: easing.reveal }}
          />
        </>
      )}
    </div>
  );
}
