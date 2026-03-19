'use client';

import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { easing } from '@/lib/animations';
import styles from './AnimatedText.module.scss';

interface AnimatedTextProps {
  children: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  className?: string;
  delay?: number;
  splitBy?: 'lines' | 'words' | 'none';
  staggerDelay?: number;
  threshold?: number;
}

export default function AnimatedText({
  children,
  as: Tag = 'p',
  className = '',
  delay = 0,
  splitBy = 'none',
  staggerDelay = 0.08,
  threshold = 0.3,
}: AnimatedTextProps) {
  const { ref, isInView } = useInView({ threshold });

  if (splitBy === 'lines') {
    const lines = children.split('\n').filter(Boolean);
    return (
      <div ref={ref} className={`${styles.textWrapper} ${className}`}>
        {lines.map((line, i) => (
          <div key={i} className={styles.lineWrap}>
            <motion.div
              className={styles.lineInner}
              initial={{ y: '110%' }}
              animate={isInView ? { y: '0%' } : { y: '110%' }}
              transition={{
                duration: 1,
                ease: easing.luxury,
                delay: delay + i * staggerDelay,
              }}
            >
              <Tag>{line}</Tag>
            </motion.div>
          </div>
        ))}
      </div>
    );
  }

  if (splitBy === 'words') {
    const words = children.split(' ');
    return (
      <div ref={ref} className={`${styles.textWrapper} ${className}`}>
        <Tag className={styles.wordsContainer}>
          {words.map((word, i) => (
            <span key={i} className={styles.wordWrap}>
              <motion.span
                className={styles.wordInner}
                initial={{ y: '110%', opacity: 0 }}
                animate={
                  isInView
                    ? { y: '0%', opacity: 1 }
                    : { y: '110%', opacity: 0 }
                }
                transition={{
                  duration: 0.8,
                  ease: easing.luxury,
                  delay: delay + i * 0.04,
                }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </Tag>
      </div>
    );
  }

  return (
    <div ref={ref}>
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
        transition={{
          duration: 0.9,
          ease: easing.luxury,
          delay,
        }}
      >
        <Tag className={className}>{children}</Tag>
      </motion.div>
    </div>
  );
}
