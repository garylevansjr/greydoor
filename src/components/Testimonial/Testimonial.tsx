'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './Testimonial.module.scss';

const TESTIMONIAL_TEXT = '\u201CLauren and Grey Door have become the invisible structure behind our lives. What used to feel chaotic now feels handled \u2014 quietly, beautifully, and without friction.\u201D';

const STATS = [
  { number: '200+', label: 'Families Served' },
  { number: '8+', label: 'Years of Service' },
  { number: '100%', label: 'Referral-Based' },
];

function StatItem({ stat, index }: { stat: typeof STATS[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0.1, 0.45, 0.55, 0.8, 1], [80, 0, 0, 0, -60]);
  const opacity = useTransform(scrollYProgress, [0.1, 0.4 + index * 0.05, 0.55, 0.8, 1], [0, 1, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0.1, 0.45, 0.55, 0.8, 1], [0.85, 1, 1, 1, 0.9]);

  return (
    <motion.div
      ref={ref}
      className={styles.stat}
      style={{ y, opacity, scale }}
    >
      <span className={styles.statNumber}>{stat.number}</span>
      <span className={styles.statLabel}>{stat.label}</span>
    </motion.div>
  );
}

function AnimatedWord({ word, index, total }: { word: string; index: number; total: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const staggerIn = 0.3 + (index / total) * 0.15;
  const staggerOut = 0.75 + (index / total) * 0.1;

  const y = useTransform(scrollYProgress, [0.15, staggerIn, 0.55, staggerOut, 1], [30, 0, 0, 0, -20]);
  const opacity = useTransform(scrollYProgress, [0.15, staggerIn, 0.55, staggerOut, 1], [0, 1, 1, 1, 0]);

  return (
    <motion.span
      ref={ref}
      className={styles.word}
      style={{ y, opacity }}
    >
      {word}&nbsp;
    </motion.span>
  );
}

export default function Testimonial() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Stats container parallax
  const statsY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);

  // Divider
  const dividerScaleX = useTransform(scrollYProgress, [0.2, 0.4, 0.7, 0.9], [0, 1, 1, 0]);

  // Label
  const labelOpacity = useTransform(scrollYProgress, [0.22, 0.4, 0.7, 0.88], [0, 1, 1, 0]);
  const labelLetterSpacing = useTransform(scrollYProgress, [0.22, 0.4, 0.7, 0.88], ['0.6em', '0.25em', '0.25em', '0.1em']);
  const labelY = useTransform(scrollYProgress, [0.7, 0.88], [0, -20]);

  // Label lines
  const labelLineScaleX = useTransform(scrollYProgress, [0.24, 0.42, 0.7, 0.9], [0, 1, 1, 0]);

  // Quote parallax
  const quoteY = useTransform(scrollYProgress, [0, 1], ['0%', '-8%']);

  // Orb parallax
  const orbY = useTransform(scrollYProgress, [0, 1], ['0%', '-25%']);
  const orbX = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);

  // Quote mark parallax
  const quoteMarkY = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);

  // Top line
  const topLineScaleY = useTransform(scrollYProgress, [0.1, 0.5], [0.3, 1]);

  // Attribution rule
  const attrRuleScaleX = useTransform(scrollYProgress, [0.4, 0.52, 0.72, 0.88], [0, 1, 1, 0]);

  // Attribution text
  const attrNameOpacity = useTransform(scrollYProgress, [0.43, 0.53, 0.7, 0.85], [0, 1, 1, 0]);
  const attrNameY = useTransform(scrollYProgress, [0.43, 0.53, 0.7, 0.85], [15, 0, 0, -15]);
  const attrTitleOpacity = useTransform(scrollYProgress, [0.46, 0.56, 0.7, 0.85], [0, 1, 1, 0]);
  const attrTitleY = useTransform(scrollYProgress, [0.46, 0.56, 0.7, 0.85], [15, 0, 0, -15]);

  const words = TESTIMONIAL_TEXT.split(' ');

  return (
    <section ref={sectionRef} className={styles.section}>
      {/* Parallax depth elements */}
      <div className={styles.depthLayer}>
        <motion.div className={styles.orbSoft} style={{ y: orbY, x: orbX }} />
        <motion.div className={styles.quoteMark} style={{ y: quoteMarkY }}>&ldquo;</motion.div>
      </div>

      {/* Top decorative line */}
      <motion.div className={styles.topLine} style={{ scaleY: topLineScaleY }} />

      <div className={styles.inner}>
        {/* Stats bar — above quote */}
        <motion.div className={styles.stats} style={{ y: statsY }}>
          {STATS.map((stat, i) => (
            <StatItem key={i} stat={stat} index={i} />
          ))}
        </motion.div>

        {/* Divider line */}
        <motion.div className={styles.statsDivider} style={{ scaleX: dividerScaleX }} />

        {/* Label */}
        <motion.div className={styles.label} style={{ opacity: labelOpacity, letterSpacing: labelLetterSpacing, y: labelY }}>
          <motion.div className={styles.labelLine} style={{ scaleX: labelLineScaleX }} />
          <span>Testimonial</span>
          <motion.div className={styles.labelLine} style={{ scaleX: labelLineScaleX }} />
        </motion.div>

        {/* Quote — word by word */}
        <motion.blockquote className={styles.quote} style={{ y: quoteY }}>
          <p className={styles.quoteText}>
            {words.map((word, i) => (
              <AnimatedWord key={i} word={word} index={i} total={words.length} />
            ))}
          </p>
        </motion.blockquote>

        {/* Attribution */}
        <div className={styles.attribution}>
          <motion.div className={styles.attrRule} style={{ scaleX: attrRuleScaleX }} />
          <motion.p className={styles.attrName} style={{ opacity: attrNameOpacity, y: attrNameY }}>Caroline M.</motion.p>
          <motion.p className={styles.attrTitle} style={{ opacity: attrTitleOpacity, y: attrTitleY }}>River Oaks, Houston</motion.p>
        </div>
      </div>
    </section>
  );
}
