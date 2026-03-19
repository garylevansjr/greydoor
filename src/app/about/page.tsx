'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from '@/components/Header/Header';
import FixedCTA from '@/components/FixedCTA/FixedCTA';
import InnerPageHero from '@/components/InnerPageHero/InnerPageHero';
import Footer from '@/components/Footer/Footer';
import TransitionLink from '@/components/TransitionLink/TransitionLink';
import { easing } from '@/lib/animations';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutPage() {
  const storyRef = useRef<HTMLElement>(null);
  const storyInView = useInView(storyRef, { once: true, amount: 0.2 });
  const valuesRef = useRef<HTMLElement>(null);
  const valuesInView = useInView(valuesRef, { once: true, amount: 0.2 });
  const gsapInitRef = useRef(false);

  useEffect(() => {
    if (gsapInitRef.current) return;
    gsapInitRef.current = true;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-parallax="about-page-orb"]').forEach((orb, i) => {
        gsap.to(orb, {
          yPercent: -25 - i * 12,
          ease: 'none',
          scrollTrigger: {
            trigger: orb.closest('section') || orb,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2 + i * 0.5,
          },
        });
      });

      gsap.to('[data-parallax="about-page-image"]', {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: storyRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const VALUES = [
    {
      title: 'Discretion',
      body: 'Your privacy is sacred. We operate with the utmost confidentiality in everything we do.',
    },
    {
      title: 'Anticipation',
      body: 'We don\'t wait for problems — we see them before they arrive and handle them before you notice.',
    },
    {
      title: 'Taste',
      body: 'Every recommendation, every choice, every detail reflects a refined understanding of quality.',
    },
    {
      title: 'Trust',
      body: 'Built through years of flawless execution, our relationships are the foundation of everything.',
    },
  ];

  return (
    <>
      <Header show />
      <FixedCTA show />

      <main>
        <InnerPageHero
          label="Grey Door"
          title="About"
          subtitle="The quiet force behind Houston's most discerning families."
        />

        {/* Story section */}
        <section
          ref={storyRef}
          style={{
            position: 'relative',
            padding: 'clamp(4rem, 8vw, 8rem) clamp(2rem, 4vw, 4rem)',
            background: '#FAF8F5',
            overflow: 'hidden',
          }}
        >
          <div
            data-parallax="about-page-orb"
            style={{
              position: 'absolute',
              top: '-10%',
              left: '10%',
              width: '45vw',
              height: '45vw',
              maxWidth: '550px',
              maxHeight: '550px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(253,229,221,0.1) 0%, transparent 70%)',
              pointerEvents: 'none',
              willChange: 'transform',
            }}
          />

          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 'clamp(3rem, 6vw, 6rem)',
              maxWidth: '1200px',
              margin: '0 auto',
              alignItems: 'center',
              flexWrap: 'wrap' as const,
            }}
          >
            {/* Image */}
            <motion.div
              style={{
                flex: 1,
                minWidth: '280px',
                maxWidth: '450px',
                aspectRatio: '3 / 4',
                borderRadius: '2px',
                overflow: 'hidden',
                position: 'relative',
              }}
              initial={{ opacity: 0, x: -30 }}
              animate={storyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1.2, ease: easing.luxury }}
            >
              <div data-parallax="about-page-image" style={{ width: '100%', height: '110%' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/home/hero.png"
                  alt="Lauren — Founder of Grey Door"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%' }}
                />
              </div>
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '3px',
                  height: '100%',
                  background: '#68161A',
                }}
              />
            </motion.div>

            {/* Text */}
            <div style={{ flex: 1, minWidth: '280px' }}>
              <motion.p
                style={{
                  fontFamily: "'brandon-grotesque', sans-serif",
                  fontSize: '0.6875rem',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase' as const,
                  color: '#B0A89F',
                  fontWeight: 500,
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                }}
                initial={{ opacity: 0, y: 15 }}
                animate={storyInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: easing.luxury }}
              >
                <span style={{ width: '30px', height: '1px', background: '#68161A', display: 'inline-block' }} />
                Her Story
              </motion.p>

              <motion.h2
                style={{
                  fontFamily: "'Tenor Sans', Georgia, serif",
                  fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                  textTransform: 'uppercase' as const,
                  color: '#1A1816',
                  marginBottom: '1.5rem',
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={storyInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, ease: easing.luxury, delay: 0.15 }}
              >
                Meet Lauren
              </motion.h2>

              {[
                'Lauren built Grey Door on a quiet conviction: that the most accomplished people don\'t need more — they need someone they can trust completely to handle everything else.',
                'Her career began in executive support, where she discovered a rare ability to anticipate needs before they surface. Over the years, she cultivated a trusted network of vetted professionals, artisans, and service providers across Houston and beyond.',
                'Today, Grey Door serves as the invisible architecture behind some of Houston\'s most distinguished families. Lauren\'s value isn\'t just execution — it\'s access, taste, timing, discretion, and the kind of trust that only comes from years of flawless delivery.',
              ].map((text, i) => (
                <motion.p
                  key={i}
                  style={{
                    fontFamily: "'Nexa', 'Helvetica Neue', sans-serif",
                    fontSize: 'clamp(0.9375rem, 1.1vw, 1.0625rem)',
                    lineHeight: 1.75,
                    color: '#3A3632',
                    maxWidth: '480px',
                    marginBottom: '1.25rem',
                  }}
                  initial={{ opacity: 0, y: 25 }}
                  animate={storyInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.9, ease: easing.luxury, delay: 0.3 + i * 0.15 }}
                >
                  {text}
                </motion.p>
              ))}
            </div>
          </div>
        </section>

        {/* Values section */}
        <section
          ref={valuesRef}
          style={{
            position: 'relative',
            padding: 'clamp(4rem, 8vw, 8rem) clamp(2rem, 4vw, 4rem)',
            background: '#FAF8F5',
            overflow: 'hidden',
          }}
        >
          <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' as const }}>
            <motion.h2
              style={{
                fontFamily: "'Tenor Sans', Georgia, serif",
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                textTransform: 'uppercase' as const,
                color: '#1A1816',
                marginBottom: 'clamp(3rem, 5vw, 5rem)',
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={valuesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: easing.luxury }}
            >
              Our Values
            </motion.h2>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: 'clamp(2rem, 3vw, 3rem)',
              }}
            >
              {VALUES.map((value, i) => (
                <motion.div
                  key={value.title}
                  style={{ textAlign: 'center' as const }}
                  initial={{ opacity: 0, y: 25 }}
                  animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, ease: easing.luxury, delay: 0.2 + i * 0.1 }}
                >
                  <div
                    style={{
                      width: '1px',
                      height: '30px',
                      background: 'rgba(26,24,22,0.1)',
                      margin: '0 auto 1.5rem',
                    }}
                  />
                  <h3
                    style={{
                      fontFamily: "'Tenor Sans', Georgia, serif",
                      fontSize: 'clamp(1.25rem, 2vw, 1.5rem)',
                      textTransform: 'uppercase' as const,
                      color: '#1A1816',
                      marginBottom: '0.75rem',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {value.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Nexa', 'Helvetica Neue', sans-serif",
                      fontSize: '0.875rem',
                      lineHeight: 1.7,
                      color: '#3A3632',
                      maxWidth: '280px',
                      margin: '0 auto',
                    }}
                  >
                    {value.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <motion.div
            style={{ textAlign: 'center' as const, marginTop: 'clamp(3rem, 5vw, 5rem)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: easing.luxury, delay: 0.8 }}
          >
            <TransitionLink
              href="/contact"
              className=""
            >
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  fontFamily: "'brandon-grotesque', sans-serif",
                  fontSize: '0.75rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase' as const,
                  color: '#68161A',
                  fontWeight: 500,
                }}
              >
                Start the Conversation
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </TransitionLink>
          </motion.div>
        </section>
      </main>

      <Footer />
    </>
  );
}
