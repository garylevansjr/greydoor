'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { easing } from '@/lib/animations';
import styles from './InnerPageHero.module.scss';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface InnerPageHeroProps {
  label: string;
  title: string;
  subtitle?: string;
}

export default function InnerPageHero({ label, title, subtitle }: InnerPageHeroProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-parallax="inner-line"]').forEach((line, i) => {
        gsap.to(line, {
          yPercent: -20 - i * 10,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      });

      gsap.to('[data-parallax="inner-orb"]', {
        yPercent: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 2,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className={styles.hero}>
      <div className={styles.background}>
        <div className={styles.gradient} />
        <div className={styles.orb} data-parallax="inner-orb" />
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className={styles.line}
            style={{ left: `${25 + i * 25}%` }}
            data-parallax="inner-line"
          />
        ))}
      </div>

      <div className={styles.content}>
        <motion.span
          className={styles.label}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easing.luxury, delay: 0.1 }}
        >
          {label}
        </motion.span>

        <div className={styles.titleWrap}>
          <motion.h1
            className={styles.title}
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 1.1, ease: easing.luxury, delay: 0.2 }}
          >
            {title}
          </motion.h1>
        </div>

        {subtitle && (
          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: easing.luxury, delay: 0.5 }}
          >
            {subtitle}
          </motion.p>
        )}

        <motion.div
          className={styles.rule}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: easing.reveal, delay: 0.7 }}
        />
      </div>
    </section>
  );
}
