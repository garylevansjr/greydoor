'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { easing } from '@/lib/animations';
import styles from './Hero.module.scss';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface HeroProps {
  show: boolean;
  onHeaderReady?: () => void;
}

// Phases: idle → contract → reveal → done
type HeroPhase = 'idle' | 'contract' | 'reveal' | 'done';

// Overlay text sequence on the image
const OVERLAY_SEQUENCE = ['Lifestyle', 'Management', 'Agency'];
const OVERLAY_INTERVAL = 2500; // ms between each swap
const OVERLAY_START_DELAY = 1000; // ms after reveal before overlay starts

const HERO_DESC = 'Grey Door is a premium concierge service that handles the details, logistics, and personal requests that keep busy lives running beautifully.';

export default function Hero({ show, onHeaderReady }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const parallaxRef = useRef<boolean>(false);
  const [phase, setPhase] = useState<HeroPhase>('idle');
  const [overlayIndex, setOverlayIndex] = useState(0);
  const [showOverlay, setShowOverlay] = useState(false);
  const [showDesc, setShowDesc] = useState(false);
  const phaseStarted = useRef(false);

  const startSequence = useCallback(() => {
    if (phaseStarted.current) return;
    phaseStarted.current = true;

    // Phase 1: mask contracts (0 → 1s)
    setPhase('contract');

    // Phase 2: slide down + title up (after 1s)
    setTimeout(() => setPhase('reveal'), 1000);

    // Phase 3: header appears
    setTimeout(() => {
      setPhase('done');
      onHeaderReady?.();
    }, 1000);

    // Overlay sequence: starts 1s after reveal (2s from start)
    setTimeout(() => setShowOverlay(true), 1000 + OVERLAY_START_DELAY);
    setTimeout(() => setShowDesc(true), 1000 + OVERLAY_START_DELAY);

    OVERLAY_SEQUENCE.forEach((_, i) => {
      if (i === 0) return;
      setTimeout(() => {
        setOverlayIndex(i);
      }, 1000 + OVERLAY_START_DELAY + i * OVERLAY_INTERVAL);
    });
  }, [onHeaderReady]);

  useEffect(() => {
    if (show) startSequence();
  }, [show, startSequence]);

  useEffect(() => {
    if (!show || parallaxRef.current) return;
    parallaxRef.current = true;

    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Hero image — slow upward drift creating depth
      gsap.to('[data-parallax="hero-image"]', {
        yPercent: -15,
        scale: 1.08,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      });

      // GREY DOOR title — faster upward movement for depth separation
      gsap.to('[data-parallax="hero-title"]', {
        yPercent: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        },
      });

      // Tagline — medium speed
      gsap.to('[data-parallax="hero-tagline"]', {
        yPercent: -25,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '60% top',
          scrub: 1,
        },
      });

      // Background hairlines — different speeds for depth
      gsap.utils.toArray<HTMLElement>('[data-parallax="hero-line"]').forEach((line, i) => {
        const speed = -8 - i * 6;
        gsap.to(line, {
          yPercent: speed,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5 + i * 0.3,
          },
        });
      });

      // Gradient orbs — floating parallax at different rates
      gsap.utils.toArray<HTMLElement>('[data-parallax="hero-orb"]').forEach((orb, i) => {
        gsap.to(orb, {
          yPercent: -20 - i * 10,
          xPercent: i % 2 === 0 ? 5 : -5,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.8,
          },
        });
      });

      // Image overlay — darken on scroll for cinematic fade
      gsap.to('[data-parallax="hero-overlay"]', {
        opacity: 0.5,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: '30% top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, section);

    return () => ctx.revert();
  }, [show]);

  return (
    <section ref={sectionRef} className={styles.hero}>
      {/* Background layer with parallax orbs */}
      <div className={styles.background}>
        <div className={styles.gradientLayer} />

        {/* Parallax gradient orbs — floating depth elements */}
        <div className={styles.orbPink} data-parallax="hero-orb" />
        <div className={styles.orbWarm} data-parallax="hero-orb" />
        <div className={styles.orbCream} data-parallax="hero-orb" />

        {/* Hairline lines at different parallax speeds */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={styles.bgLine}
            style={{ left: `${15 + i * 18}%` }}
            data-parallax="hero-line"
          />
        ))}
      </div>

      {/* GREY DOOR title — static, uncovered as inner slides down */}
      <motion.div
        className={styles.titleWrap}
        data-parallax="hero-title"
        initial={{ opacity: 0 }}
        animate={
          phase === 'reveal' || phase === 'done'
            ? { opacity: 1 }
            : { opacity: 0 }
        }
        transition={{
          duration: 0.8,
          ease: easing.luxury,
        }}
      >
        <h1 className={styles.title}>Grey Door</h1>
      </motion.div>

      {/* Hero inner — starts 100vw×100vh, mask contracts, then slides down to reveal title */}
      <motion.div
        className={styles.heroInner}
        initial={{
          clipPath: 'inset(0% 0% 0% 0%)',
          y: 0,
        }}
        animate={
          phase === 'contract'
            ? {
                clipPath: 'inset(2% 3% 2% 3% round 4px)',
                y: 0,
              }
            : phase === 'reveal' || phase === 'done'
              ? {
                  clipPath: 'inset(2% 3% 2% 3% round 4px)',
                  y: '26vh',
                }
              : {
                  clipPath: 'inset(0% 0% 0% 0%)',
                  y: 0,
                }
        }
        transition={{
          duration: phase === 'contract' ? 1.2 : 1.6,
          ease: easing.luxury,
        }}
      >
        <div className={styles.imageMask} data-parallax="hero-image">
          <motion.div
            className={styles.imageScale}
            initial={{ scale: 1.15 }}
            animate={show ? { scale: 1 } : {}}
            transition={{
              duration: 2.2,
              ease: easing.luxury,
              delay: 0.1,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/home/hero.png"
              alt="Grey Door — Luxury concierge services in Houston"
              className={styles.heroImage}
            />
          </motion.div>
          <div className={styles.imageOverlay} data-parallax="hero-overlay" />

          {/* Overlay subtitle — top-right on image */}
          {showOverlay && (
            <div className={styles.overlayTextWrap}>
              <div className={styles.overlayTextInner}>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={overlayIndex}
                    className={styles.overlayChars}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    {OVERLAY_SEQUENCE[overlayIndex].split('').map((char, i) => (
                      <motion.span
                        key={`o-${overlayIndex}-${i}`}
                        className={styles.overlayChar}
                        variants={{
                          initial: { y: '100%', opacity: 0 },
                          animate: { y: 0, opacity: 1 },
                          exit: { y: '-100%', opacity: 0 },
                        }}
                        transition={{
                          duration: 0.5,
                          ease: [0.16, 1, 0.3, 1],
                          delay: i * 0.03,
                        }}
                      >
                        {char === ' ' ? '\u00A0' : char}
                      </motion.span>
                    ))}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
          )}

          {/* Overlay description — top-left on image, word by word */}
          {showDesc && (
            <div className={styles.overlayDescWrap}>
              <p>
                {HERO_DESC.split(' ').map((word, i) => (
                  <motion.span
                    key={i}
                    className={styles.overlayDescWord}
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.5,
                      ease: [0.16, 1, 0.3, 1],
                      delay: i * 0.04,
                    }}
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
              </p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Subtle tagline */}
      <motion.div
        className={styles.tagline}
        data-parallax="hero-tagline"
        initial={{ opacity: 0, y: 20 }}
        animate={show ? { opacity: 1, y: 0 } : {}}
        transition={{
          duration: 1,
          ease: easing.luxury,
          delay: 1.8,
        }}
      >
        <p className={styles.taglineText}>Luxury Concierge &amp; Lifestyle Management</p>
        <div className={styles.taglineRule} />
        <p className={styles.taglineCity}>Houston, Texas</p>
      </motion.div>
    </section>
  );
}
