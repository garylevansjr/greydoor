'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from '@/components/Header/Header';
import FixedCTA from '@/components/FixedCTA/FixedCTA';
import InnerPageHero from '@/components/InnerPageHero/InnerPageHero';
import Footer from '@/components/Footer/Footer';
import { easing } from '@/lib/animations';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ALL_SERVICES = [
  {
    title: 'Executive & Personal Assistance',
    description:
      'Thoughtful, anticipatory support for individuals and families who need everything to run flawlessly. From calendar orchestration and complex logistics to daily task management — we handle the details so you can focus on what matters.',
    accent: '#1D3B28',
  },
  {
    title: 'Travel Coordination',
    description:
      'Bespoke itineraries, seamless bookings, and on-the-ground coordination. Every detail considered so you can be fully present wherever you go. From private villas to last-minute changes — we make travel effortless.',
    accent: '#68161A',
  },
  {
    title: 'Holiday Gifting & Card Services',
    description:
      'Curated, meaningful gifting and correspondence that reflects your taste and strengthens your relationships. We manage everything from sourcing and wrapping to delivery and tracking — handled with care and discretion.',
    accent: '#E2BC31',
  },
  {
    title: 'Home & Personal Services',
    description:
      'Vendor management, property oversight, household coordination, and the daily details that keep your personal world running beautifully. We become the single point of contact for your home and life.',
    accent: '#638B48',
  },
  {
    title: 'Personal Shopping & Styling',
    description:
      'Elevated sourcing and styling for wardrobes, homes, and occasions. Guided by an understanding of your preferences and lifestyle, we curate selections that feel effortlessly right.',
    accent: '#E8BDD8',
  },
  {
    title: 'Event Planning',
    description:
      'From intimate gatherings to milestone celebrations — flawlessly planned, beautifully executed, and entirely stress-free. We handle the vision, the vendors, and every detail in between.',
    accent: '#68161A',
  },
  {
    title: 'Health & Wellness Services',
    description:
      'Coordinating appointments, managing prescriptions, booking wellness retreats, and keeping your health routines running seamlessly. Your well-being, thoughtfully managed.',
    accent: '#1D3B28',
  },
  {
    title: 'Pet Care Services',
    description:
      'Trusted care coordination for the members of your family who can\'t speak for themselves. From vet appointments to grooming, boarding, and daily routines — we treat them like our own.',
    accent: '#638B48',
  },
];

function ServiceCard({
  service,
  index,
}: {
  service: typeof ALL_SERVICES[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      style={{
        display: 'flex',
        flexDirection: index % 2 === 0 ? 'row' : 'row-reverse',
        alignItems: 'center',
        gap: 'clamp(2rem, 5vw, 6rem)',
        padding: 'clamp(3rem, 5vw, 5rem) clamp(2rem, 4vw, 4rem)',
        maxWidth: '1200px',
        margin: '0 auto',
        flexWrap: 'wrap' as const,
      }}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: easing.luxury, delay: 0.1 }}
    >
      {/* Number + accent */}
      <div style={{ flex: '0 0 auto', position: 'relative' }}>
        <span
          style={{
            fontFamily: "'Tenor Sans', Georgia, serif",
            fontSize: 'clamp(4rem, 8vw, 7rem)',
            lineHeight: 0.85,
            letterSpacing: '-0.03em',
            color: service.accent,
            opacity: 0.15,
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: '280px' }}>
        <div
          style={{
            width: '30px',
            height: '2px',
            background: service.accent,
            marginBottom: '1.5rem',
          }}
        />
        <h2
          style={{
            fontFamily: "'Tenor Sans', Georgia, serif",
            fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)',
            lineHeight: 1.15,
            letterSpacing: '-0.01em',
            textTransform: 'uppercase' as const,
            color: '#1A1816',
            marginBottom: '1rem',
          }}
        >
          {service.title}
        </h2>
        <p
          style={{
            fontFamily: "'Nexa', 'Helvetica Neue', sans-serif",
            fontSize: 'clamp(0.875rem, 1vw, 1rem)',
            lineHeight: 1.75,
            color: '#3A3632',
            maxWidth: '500px',
          }}
        >
          {service.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function ServicesPage() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-parallax="svc-page-orb"]').forEach((orb, i) => {
        gsap.to(orb, {
          yPercent: -20 - i * 10,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2,
          },
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Header show />
      <FixedCTA show />

      <main>
        <InnerPageHero
          label="Gray Door"
          title="Services"
          subtitle="Every detail of your life, thoughtfully managed. We offer a comprehensive suite of concierge and lifestyle services — each one tailored to you."
        />

        <div
          ref={gridRef}
          style={{
            position: 'relative',
            background: '#FAF8F5',
            paddingBottom: 'clamp(4rem, 8vw, 8rem)',
            overflow: 'hidden',
          }}
        >
          {/* Parallax orbs */}
          <div
            data-parallax="svc-page-orb"
            style={{
              position: 'absolute',
              top: '10%',
              right: '-5%',
              width: '40vw',
              height: '40vw',
              maxWidth: '500px',
              maxHeight: '500px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(253,229,221,0.1) 0%, transparent 70%)',
              pointerEvents: 'none',
              willChange: 'transform',
            }}
          />
          <div
            data-parallax="svc-page-orb"
            style={{
              position: 'absolute',
              bottom: '5%',
              left: '-5%',
              width: '35vw',
              height: '35vw',
              maxWidth: '450px',
              maxHeight: '450px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(245,240,235,0.4) 0%, transparent 65%)',
              pointerEvents: 'none',
              willChange: 'transform',
            }}
          />

          {/* Service items separated by hairlines */}
          {ALL_SERVICES.map((service, i) => (
            <div key={i}>
              {i > 0 && (
                <div
                  style={{
                    width: '60%',
                    maxWidth: '600px',
                    height: '1px',
                    background: 'rgba(26,24,22,0.06)',
                    margin: '0 auto',
                  }}
                />
              )}
              <ServiceCard service={service} index={i} />
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}
