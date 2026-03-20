'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

// Interpolate between two hex colors
function lerpColor(a: string, b: string, t: number): string {
  const parse = (hex: string) => [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ];
  const [r1, g1, b1] = parse(a);
  const [r2, g2, b2] = parse(b);
  const r = Math.round(r1 + (r2 - r1) * t);
  const g = Math.round(g1 + (g2 - g1) * t);
  const bl = Math.round(b1 + (b2 - b1) * t);
  return `rgb(${r},${g},${bl})`;
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  // Desktop: GSAP ScrollTrigger pin + horizontal scroll
  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    // Only pin on desktop
    if (window.innerWidth <= 768) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    // Wait for layout
    const raf = requestAnimationFrame(() => {
      const cards = track.querySelectorAll<HTMLElement>('[data-svc-card]');
      if (cards.length === 0) return;

      const cardWidth = cards[0].offsetWidth;
      const gap = parseFloat(getComputedStyle(track).gap) || 0;
      const totalTravel = (cards.length - 1) * (cardWidth + gap);

      const tween = gsap.to(track, {
        x: -totalTravel,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${SERVICES.length * window.innerHeight}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress * SERVICES.length;
            const idx = Math.min(SERVICES.length - 1, Math.floor(p));
            setActiveIndex(idx);

            // Drive gradient background
            if (bgRef.current) {
              const nextIdx = Math.min(SERVICES.length - 1, idx + 1);
              const t = p - Math.floor(p); // 0–1 between current and next
              const colorA = lerpColor(SERVICES[idx].accent, SERVICES[nextIdx].accent, t);
              const colorB = idx > 0
                ? lerpColor(SERVICES[idx - 1].accent, SERVICES[idx].accent, t)
                : colorA;
              bgRef.current.style.background = `radial-gradient(ellipse at 30% 40%, ${colorA}40 0%, transparent 60%), radial-gradient(ellipse at 70% 60%, ${colorB}30 0%, transparent 55%), radial-gradient(ellipse at 50% 50%, ${colorA}20 0%, transparent 70%)`;
            }
          },
        },
      });

      tweenRef.current = tween;
    });

    return () => {
      cancelAnimationFrame(raf);
      tweenRef.current?.scrollTrigger?.kill();
      tweenRef.current?.kill();
    };
  }, []);

  // GSAP parallax for background elements
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
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
      {/* Dynamic gradient background */}
      <div ref={bgRef} className={styles.bgGradient} />

      {/* Parallax background depth elements */}
      <div className={styles.bgDepth}>
        <div className={styles.bgOrbGreen} data-parallax="svc-orb" />
        <div className={styles.bgOrbBurgundy} data-parallax="svc-orb" />
        <div className={styles.bgOrbDark} data-parallax="svc-orb" />
      </div>

      <div className={styles.stickyInner}>
        {/* Header row: label + counter */}
        <div className={styles.header}>
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
        </div>

        {/* Horizontal track */}
        <div className={styles.trackWrap}>
          <div ref={trackRef} className={styles.track}>
            {SERVICES.map((service, i) => (
              <article key={service.id} className={styles.card} data-svc-card>
                <div className={styles.cardImageWrap}>
                  <div
                    className={styles.cardAccent}
                    style={{ background: service.accent }}
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={service.image}
                    alt={service.title}
                    className={styles.cardImage}
                  />
                  <div className={styles.cardOverlay} />
                  <span className={styles.cardNumber}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{service.title}</h3>
                  <p className={styles.cardExcerpt}>{service.excerpt}</p>
                  <a href="/services" className={styles.cardLink}>
                    <span>Learn More</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>

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

      {/* Large "Services" watermark */}
      <div ref={titleRef} className={styles.bigTitle} data-parallax="svc-watermark">
        <motion.span
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 0.075, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, ease: easing.luxury }}
        >
          Services
        </motion.span>
      </div>
    </section>
  );
}
