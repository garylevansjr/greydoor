'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { easing } from '@/lib/animations';
import styles from './FixedCTA.module.scss';

interface FixedCTAProps {
  show: boolean;
}

const SERVICE_OPTIONS = [
  { id: 'executive', label: 'Executive Assistance', icon: '📋' },
  { id: 'travel', label: 'Travel', icon: '✈️' },
  { id: 'gifting', label: 'Gifting & Cards', icon: '🎁' },
  { id: 'home', label: 'Home Services', icon: '🏠' },
  { id: 'shopping', label: 'Personal Shopping', icon: '🛍️' },
  { id: 'events', label: 'Event Planning', icon: '🥂' },
  { id: 'styling', label: 'Styling', icon: '👗' },
  { id: 'logistics', label: 'Logistics', icon: '📦' },
  { id: 'other', label: 'Other', icon: '✨' },
];

type FormState = 'button' | 'form' | 'success';

export default function FixedCTA({ show }: FixedCTAProps) {
  const [state, setState] = useState<FormState>('button');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selected, setSelected] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const toggleService = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setIsSubmitting(true);
    // Simulate submit
    await new Promise((r) => setTimeout(r, 1200));
    setIsSubmitting(false);
    setState('success');
    // Auto-close after 4s
    setTimeout(() => {
      setState('button');
      setName('');
      setEmail('');
      setPhone('');
      setSelected([]);
    }, 4000);
  };

  const handleClose = () => {
    setState('button');
  };

  const handleOpen = () => {
    setState('form');
  };

  return (
    <AnimatePresence mode="wait">
      {show && state === 'button' && (
        <motion.div
          key="cta-button"
          className={styles.ctaWrapper}
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5, ease: easing.luxury }}
        >
          <div className={styles.glassContainer}>
            <button className={styles.cta} onClick={handleOpen}>
              <svg
                className={styles.chatIcon}
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <span className={styles.ctaText}>Start the Conversation</span>
            </button>
          </div>
        </motion.div>
      )}

      {show && state === 'form' && (
        <motion.div
          key="cta-form"
          className={styles.formOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: easing.smooth }}
        >
          <motion.div
            ref={formRef}
            className={styles.formGlassWrap}
            initial={{ scale: 0.3, y: 100, opacity: 0, borderRadius: '100px' }}
            animate={{ scale: 1, y: 0, opacity: 1, borderRadius: '32px' }}
            exit={{ scale: 0.3, y: 100, opacity: 0, borderRadius: '100px' }}
            transition={{ duration: 0.6, ease: easing.luxury }}
          >
          <div className={styles.formGlass}>
            {/* Close button */}
            <button className={styles.closeBtn} onClick={handleClose} aria-label="Close">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Lauren intro */}
            <motion.p
              className={styles.formIntro}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: easing.luxury, delay: 0.3 }}
            >
              I&apos;d love to learn how I can make your life easier. Let&apos;s connect.
            </motion.p>

            <form onSubmit={handleSubmit} className={styles.form}>
              {/* Input fields */}
              <motion.div
                className={styles.inputGroup}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: easing.luxury, delay: 0.4 }}
              >
                <div className={styles.inputWrap}>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={styles.input}
                    required
                  />
                </div>
                <div className={styles.inputWrap}>
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.input}
                    required
                  />
                </div>
                <div className={styles.inputWrap}>
                  <input
                    type="tel"
                    placeholder="Phone (optional)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={styles.input}
                  />
                </div>
              </motion.div>

              {/* Services grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: easing.luxury, delay: 0.5 }}
              >
                <p className={styles.servicesLabel}>How can I help?</p>
                <div className={styles.servicesGrid}>
                  {SERVICE_OPTIONS.map((svc, i) => (
                    <motion.button
                      key={svc.id}
                      type="button"
                      className={`${styles.serviceChip} ${selected.includes(svc.id) ? styles.serviceChipActive : ''}`}
                      onClick={() => toggleService(svc.id)}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, ease: easing.luxury, delay: 0.55 + i * 0.04 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className={styles.serviceIcon}>{svc.icon}</span>
                      <span className={styles.serviceLabel}>{svc.label}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Submit */}
              <motion.button
                type="submit"
                className={styles.submitBtn}
                disabled={isSubmitting}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: easing.luxury, delay: 0.7 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <motion.span
                    className={styles.spinner}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  />
                ) : (
                  'Send'
                )}
              </motion.button>
            </form>
          </div>
          </motion.div>
        </motion.div>
      )}

      {show && state === 'success' && (
        <motion.div
          key="cta-success"
          className={styles.formOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            className={styles.formGlassWrap}
            initial={{ scale: 1.05, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.6, ease: easing.luxury }}
          >
          <div className={styles.successGlass}>
            <motion.div
              className={styles.successCheck}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, ease: easing.luxury, delay: 0.2 }}
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </motion.div>
            <motion.p
              className={styles.successTitle}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Talk to you soon.
            </motion.p>
            <motion.p
              className={styles.successSub}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              I&apos;ll be in touch within 24 hours.
            </motion.p>
          </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
