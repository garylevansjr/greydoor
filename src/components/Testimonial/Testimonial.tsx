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

const TESTIMONIAL_TEXT = '\u201CLauren and Grey Door have become the invisible structure behind our lives. What used to feel chaotic now feels handled \u2014 quietly, beautifully, and without friction.\u201D';

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

      // Stats — faster upward drift
      gsap.to('[data-parallax="test-stats"]', {
        yPercent: -25,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        },
      });

      // Quote — slower drift, creating depth separation from stats
      gsap.to('[data-parallax="test-quote"]', {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
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
        {/* Stats bar — above quote */}
        <motion.div
          ref={statsRef}
          className={styles.stats}
          data-parallax="test-stats"
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              className={styles.stat}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={statsInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 1,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.15 + i * 0.15,
              }}
            >
              <motion.span
                className={styles.statNumber}
                initial={{ opacity: 0, y: 30 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.9,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.3 + i * 0.15,
                }}
              >
                {stat.number}
              </motion.span>
              <motion.span
                className={styles.statLabel}
                initial={{ opacity: 0 }}
                animate={statsInView ? { opacity: 1 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.6 + i * 0.15,
                }}
              >
                {stat.label}
              </motion.span>
            </motion.div>
          ))}
        </motion.div>

        {/* Divider line — grows from center */}
        <motion.div
          className={styles.statsDivider}
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.6,
          }}
        />

        {/* Label */}
        <motion.div
          className={styles.label}
          initial={{ opacity: 0, letterSpacing: '0.5em' }}
          animate={isInView ? { opacity: 1, letterSpacing: '0.25em' } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
        >
          <motion.div
            className={styles.labelLine}
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.9 }}
          />
          <span>Testimonial</span>
          <motion.div
            className={styles.labelLine}
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.9 }}
          />
        </motion.div>

        {/* Quote — word by word reveal */}
        <blockquote className={styles.quote} data-parallax="test-quote">
          <p className={styles.quoteText}>
            {TESTIMONIAL_TEXT.split(' ').map((word, i) => (
              <motion.span
                key={i}
                className={styles.word}
                initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
                animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                transition={{
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 1.0 + i * 0.04,
                }}
              >
                {word}{' '}
              </motion.span>
            ))}
          </p>
        </blockquote>

        {/* Attribution — fade up with rule growing */}
        <motion.div
          className={styles.attribution}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 2.4 }}
        >
          <motion.div
            className={styles.attrRule}
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 2.4 }}
          />
          <motion.p
            className={styles.attrName}
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 2.6 }}
          >
            Caroline M.
          </motion.p>
          <motion.p
            className={styles.attrTitle}
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 2.8 }}
          >
            River Oaks, Houston
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
