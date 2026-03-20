'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { easing } from '@/lib/animations';
import styles from './AboutLauren.module.scss';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutLauren() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.25 });
  const gsapInitRef = useRef(false);
  const signatureContainerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lottieInstance = useRef<any>(null);
  const [signatureLoaded, setSignatureLoaded] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || gsapInitRef.current) return;
    gsapInitRef.current = true;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Image — slow upward drift for depth against text
      gsap.to('[data-parallax="about-image"]', {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });

      // Image inner — subtle scale for cinematic zoom
      gsap.fromTo(
        '[data-parallax="about-image-inner"]',
        { scale: 1.1 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'center center',
            scrub: 1.2,
          },
        }
      );

      // Background orbs
      gsap.to('[data-parallax="about-orb-1"]', {
        yPercent: -20,
        xPercent: -5,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        },
      });

      gsap.to('[data-parallax="about-orb-2"]', {
        yPercent: -15,
        xPercent: 8,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2.5,
        },
      });

      // Decorative accent line
      gsap.fromTo(
        '[data-parallax="about-accent-line"]',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'center center',
            scrub: 1,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  // Load Lottie signature via CDN script to avoid SSR/bundler issues
  useEffect(() => {
    const container = signatureContainerRef.current;
    if (!container) return;

    let destroyed = false;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const win = window as any;

    const init = (data: unknown) => {
      if (destroyed || !win.lottie) return;
      lottieInstance.current = win.lottie.loadAnimation({
        container,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        animationData: data,
      });
      setSignatureLoaded(true);
    };

    const loadData = () => fetch('/assets/media/signature.json').then((r) => r.json());

    if (win.lottie) {
      loadData().then(init);
    } else {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js';
      script.onload = () => loadData().then(init);
      document.head.appendChild(script);
    }

    return () => {
      destroyed = true;
      lottieInstance.current?.destroy();
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} id="about">
      {/* Parallax depth elements */}
      <div className={styles.depthLayer}>
        <div className={styles.orbPink} data-parallax="about-orb-1" />
        <div className={styles.orbCream} data-parallax="about-orb-2" />
        <div className={styles.accentLine} data-parallax="about-accent-line" />
      </div>

      <div className={styles.inner}>
        {/* Text side */}
        <div className={styles.textSide}>
          <motion.div
            className={styles.label}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: easing.luxury }}
          >
            <div className={styles.labelRule} />
            <span>About</span>
          </motion.div>

          <div className={styles.headingWrap}>
            <motion.h2
              className={styles.heading}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: easing.luxury, delay: 0.15 }}
            >
              Meet Lauren
            </motion.h2>
          </div>

          <motion.p
            className={styles.body}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: easing.luxury, delay: 0.3 }}
          >
            Lauren has spent years becoming the person clients call when life needs
            to work flawlessly. Her value isn&apos;t just execution — it&apos;s access, taste,
            timing, discretion, and a trusted network cultivated through years of
            meaningful relationships.
          </motion.p>

          <motion.blockquote
            className={styles.quote}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: easing.luxury, delay: 0.45 }}
          >
            &ldquo;My goal is to make life feel beautifully handled.&rdquo;
          </motion.blockquote>

          <motion.div
            className={styles.signature}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, ease: easing.luxury, delay: 0 }}
            onAnimationComplete={() => { if (isInView && signatureLoaded) lottieInstance.current?.play(); }}
          >
            <div ref={signatureContainerRef} className={styles.signatureLottie} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: easing.luxury, delay: 0.6 }}
          >
            <a href="/about" className={styles.cta}>
              <span>Start the Conversation</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </motion.div>
        </div>

        {/* Image side with parallax */}
        <motion.div
          className={styles.imageSide}
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1.2, ease: easing.luxury, delay: 0.2 }}
        >
          <div className={styles.imageFrame} data-parallax="about-image">
            <div className={styles.imageAccent} />
            <div className={styles.imageInner} data-parallax="about-image-inner">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/home/lauren.png"
                alt="Lauren — Founder of Gray Door"
                className={styles.image}
              />
            </div>
            <div className={styles.imageOverlay} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
