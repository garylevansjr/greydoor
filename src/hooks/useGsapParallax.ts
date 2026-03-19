'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ParallaxTarget {
  selector: string;
  yPercent?: number;
  y?: number;
  scale?: number;
  opacity?: [number, number];
  rotation?: number;
  scrub?: number | boolean;
  start?: string;
  end?: string;
}

export function useGsapParallax(targets: ParallaxTarget[]) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Respect reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      targets.forEach((target) => {
        const elements = container.querySelectorAll(target.selector);
        if (!elements.length) return;

        const animProps: gsap.TweenVars = {};

        if (target.yPercent !== undefined) animProps.yPercent = target.yPercent;
        if (target.y !== undefined) animProps.y = target.y;
        if (target.scale !== undefined) animProps.scale = target.scale;
        if (target.rotation !== undefined) animProps.rotation = target.rotation;

        if (target.opacity) {
          // Set starting opacity, animate to end
          gsap.set(elements, { opacity: target.opacity[0] });
          animProps.opacity = target.opacity[1];
        }

        gsap.to(elements, {
          ...animProps,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: target.start || 'top bottom',
            end: target.end || 'bottom top',
            scrub: target.scrub ?? 1,
          },
        });
      });
    }, container);

    return () => ctx.revert();
  }, [targets]);

  return containerRef;
}

// Simpler single-element parallax
export function useParallaxElement(
  speed: number = 0.3,
  opts?: { start?: string; end?: string; scrub?: number }
) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        yPercent: speed * 100,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: opts?.start || 'top bottom',
          end: opts?.end || 'bottom top',
          scrub: opts?.scrub ?? 1.2,
        },
      });
    });

    return () => ctx.revert();
  }, [speed, opts]);

  return ref;
}
