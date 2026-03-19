'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { easing } from '@/lib/animations';
import styles from './Testimonial.module.scss';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const TESTIMONIAL_LINES = [
  'Lauren and Grey Door have become',
  'the invisible structure behind our lives.',
  'What used to feel chaotic now feels handled —',
  'quietly, beautifully, and without friction.',
];

const STATS = [
  { number: '200+', label: 'Families Served' },
  { number: '8+', label: 'Years of Service' },
  { number: '100%', label: 'Referral-Based' },
];

export default function Testimonial() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, amount: 0.5 });
  const gsapInitRef = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || gsapInitRef.current) return;
    gsapInitRef.current = true;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Top hairline — grows and fades
      gsap.fromTo(
        '[data-parallax="test-line-top"]',
        { scaleY: 0.3 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'center center',
            scrub: 1.5,
          },
        }
      );

      // Decorative quote marks — subtle float
      gsap.to('[data-parallax="test-quote-mark"]', {
        yPercent: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        },
      });

      // Background atmospheric orb
      gsap.to('[data-parallax="test-orb"]', {
        yPercent: -25,
        xPercent: 8,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2.5,
        },
      });

      // Stats bar — gentle upward drift
      gsap.to('[data-parallax="test-stats"]', {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'center center',
          end: 'bottom top',
          scrub: 1.5,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      {/* Parallax depth elements */}
      <div className={styles.depthLayer}>
        <div className={styles.orbSoft} data-parallax="test-orb" />
        <div className={styles.quoteMark} data-parallax="test-quote-mark">&ldquo;</div>
      </div>

      {/* Top decorative line */}
      <div className={styles.topLine} data-parallax="test-line-top" />

      <div className={styles.inner}>
        {/* Label */}
        <motion.div
          className={styles.label}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: easing.luxury }}
        >
          <div className={styles.labelLine} />
          <span>Testimonial</span>
          <div className={styles.labelLine} />
        </motion.div>

        {/* Quote */}
        <blockquote className={styles.quote}>
          {TESTIMONIAL_LINES.map((line, i) => (
            <div key={i} className={styles.lineWrap}>
              <motion.span
                className={styles.lineText}
                initial={{ y: '120%' }}
                animate={isInView ? { y: '0%' } : {}}
                transition={{
                  duration: 1.1,
                  ease: easing.luxury,
                  delay: 0.3 + i * 0.12,
                }}
              >
                {line}
              </motion.span>
            </div>
          ))}
        </blockquote>

        {/* Attribution */}
        <motion.div
          className={styles.attribution}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: easing.smooth, delay: 1.2 }}
        >
          <div className={styles.attrRule} />
          <p className={styles.attrName}>Caroline M.</p>
          <p className={styles.attrTitle}>River Oaks, Houston</p>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          ref={statsRef}
          className={styles.stats}
          data-parallax="test-stats"
          initial={{ opacity: 0, y: 30 }}
          animate={statsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: easing.luxury, delay: 0.2 }}
        >
          {STATS.map((stat, i) => (
            <div key={i} className={styles.stat}>
              <motion.span
                className={styles.statNumber}
                initial={{ opacity: 0, y: 15 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.7,
                  ease: easing.luxury,
                  delay: 0.4 + i * 0.1,
                }}
              >
                {stat.number}
              </motion.span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
