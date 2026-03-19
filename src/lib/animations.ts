// ─────────────────────────────────────────────
// Grey Door — Animation Presets
// ─────────────────────────────────────────────

import type { Variants } from 'framer-motion';

// Easing curves
export const easing = {
  smooth: [0.25, 0.46, 0.45, 0.94] as const,
  luxury: [0.16, 1, 0.3, 1] as const,
  reveal: [0.77, 0, 0.175, 1] as const,
  gentle: [0.43, 0.13, 0.23, 0.96] as const,
};

// Fade up — the core entrance animation
export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: easing.luxury,
      delay,
    },
  }),
};

// Fade in only
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: easing.smooth,
      delay,
    },
  }),
};

// Mask reveal (clip from bottom)
export const maskRevealUp: Variants = {
  hidden: {
    clipPath: 'inset(100% 0% 0% 0%)',
  },
  visible: (delay = 0) => ({
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: {
      duration: 1.2,
      ease: easing.reveal,
      delay,
    },
  }),
};

// Slide down (header entrance)
export const slideDown: Variants = {
  hidden: {
    y: -100,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
      ease: easing.luxury,
    },
  },
};

// Slide up (CTA entrance)
export const slideUp: Variants = {
  hidden: {
    y: 60,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: easing.luxury,
    },
  },
};

// Stagger container
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

// Line reveal for text
export const lineReveal: Variants = {
  hidden: {
    y: '110%',
  },
  visible: (delay = 0) => ({
    y: '0%',
    transition: {
      duration: 1,
      ease: easing.luxury,
      delay,
    },
  }),
};

// Scale reveal
export const scaleIn: Variants = {
  hidden: {
    scale: 1.1,
    opacity: 0,
  },
  visible: (delay = 0) => ({
    scale: 1,
    opacity: 1,
    transition: {
      duration: 1.4,
      ease: easing.luxury,
      delay,
    },
  }),
};
