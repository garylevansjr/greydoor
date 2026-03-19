'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { easing } from '@/lib/animations';
import styles from './Services.module.scss';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const SERVICES = [
  {
    id: 1,
    title: 'Executive & Personal Assistance',
    excerpt:
      'Thoughtful, anticipatory support for individuals and families who need everything to run flawlessly — from calendar orchestration to complex logistics.',
    image: '/assets/home/hero.png',
    accent: '#1D3B28',
  },
  {
    id: 2,
    title: 'Travel Coordination',
    excerpt:
      'Bespoke itineraries, seamless bookings, and on-the-ground coordination. Every detail considered so you can be fully present wherever you go.',
    image: '/assets/home/hero.png',
    accent: '#68161A',
  },
  {
    id: 3,
    title: 'Holiday Gifting & Card Services',
    excerpt:
      'Curated, meaningful gifting and correspondence that reflects your taste and strengthens your relationships — handled with care and discretion.',
    image: '/assets/home/hero.png',
    accent: '#E2BC31',
  },
  {
    id: 4,
    title: 'Home & Personal Services',
    excerpt:
      'Vendor management, property oversight, household coordination, and the daily details that keep your personal world running beautifully.',
    image: '/assets/home/hero.png',
    accent: '#638B48',
  },
  {
    id: 5,
    title: 'Personal Shopping & Styling',
    excerpt:
      'Elevated sourcing and styling for wardrobes, homes, and occasions — guided by an understanding of your preferences and lifestyle.',
    image: '/assets/home/hero.png',
    accent: '#E8BDD8',
  },
  {
    id: 6,
    title: 'Event Planning',
    excerpt:
      'From intimate gatherings to milestone celebrations — flawlessly planned, beautifully executed, and entirely stress-free.',
    image: '/assets/home/hero.png',
    accent: '#68161A',
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, amount: 0.3 });
  const [activeIndex, setActiveIndex] = useState(0);
  const gsapInitRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = sectionRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;
      const scrollInSection = -rect.top;
      const scrollableHeight = sectionHeight - viewportHeight;

      if (scrollInSection < 0 || scrollInSection > scrollableHeight) return;

      const progress = scrollInSection / scrollableHeight;
      const newIndex = Math.min(
        SERVICES.length - 1,
        Math.floor(progress * SERVICES.length)
      );
      setActiveIndex(newIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP parallax for background elements
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || gsapInitRef.current) return;
    gsapInitRef.current = true;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Background gradient orbs — float at different speeds
      gsap.utils.toArray<HTMLElement>('[data-parallax="svc-orb"]').forEach((orb, i) => {
        gsap.to(orb, {
          yPercent: -30 - i * 15,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2 + i * 0.5,
          },
        });
      });

      // Hairline elements
      gsap.utils.toArray<HTMLElement>('[data-parallax="svc-line"]').forEach((line, i) => {
        gsap.to(line, {
          yPercent: -15 - i * 8,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      });

      // Large "Services" watermark — slow drift
      gsap.to('[data-parallax="svc-watermark"]', {
        yPercent: -20,
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
    <section ref={sectionRef} className={styles.section} id="services">
      {/* Parallax background depth elements */}
      <div className={styles.bgDepth}>
        <div className={styles.bgOrbGreen} data-parallax="svc-orb" />
        <div className={styles.bgOrbBurgundy} data-parallax="svc-orb" />
        <div className={styles.bgOrbDark} data-parallax="svc-orb" />
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className={styles.bgLine}
            style={{ left: `${20 + i * 20}%` }}
            data-parallax="svc-line"
          />
        ))}
      </div>

      <div className={styles.stickyWrap}>
        <div className={styles.stickyInner}>
          {/* Left — Service info */}
          <div className={styles.contentSide}>
            <motion.div
              className={styles.sectionLabel}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: easing.luxury }}
            >
              <span className={styles.labelText}>What We Do</span>
              <span className={styles.labelCount}>
                {String(activeIndex + 1).padStart(2, '0')} / {String(SERVICES.length).padStart(2, '0')}
              </span>
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                className={styles.serviceContent}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: easing.luxury }}
              >
                <h3 className={styles.serviceTitle}>{SERVICES[activeIndex].title}</h3>
                <p className={styles.serviceExcerpt}>{SERVICES[activeIndex].excerpt}</p>

                <a href="/services" className={styles.serviceLink}>
                  <span>Learn More</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </motion.div>
            </AnimatePresence>

            {/* Progress dots */}
            <div className={styles.dots}>
              {SERVICES.map((_, i) => (
                <div
                  key={i}
                  className={`${styles.dot} ${i === activeIndex ? styles.dotActive : ''}`}
                />
              ))}
            </div>
          </div>

          {/* Right — Image card */}
          <div className={styles.imageSide}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                className={styles.imageCard}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.02, y: -10 }}
                transition={{ duration: 0.7, ease: easing.luxury }}
              >
                <div
                  className={styles.imageAccent}
                  style={{ background: SERVICES[activeIndex].accent }}
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={SERVICES[activeIndex].image}
                  alt={SERVICES[activeIndex].title}
                  className={styles.cardImage}
                />
                <div className={styles.cardOverlay} />
                <span className={styles.cardNumber}>
                  {String(activeIndex + 1).padStart(2, '0')}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Large "Services" text */}
        <div ref={titleRef} className={styles.bigTitle} data-parallax="svc-watermark">
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={titleInView ? { opacity: 0.06, y: 0 } : {}}
            transition={{ duration: 1.2, ease: easing.luxury }}
          >
            Services
          </motion.span>
        </div>
      </div>
    </section>
  );
}
