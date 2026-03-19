'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Header from '@/components/Header/Header';
import FixedCTA from '@/components/FixedCTA/FixedCTA';
import InnerPageHero from '@/components/InnerPageHero/InnerPageHero';
import Footer from '@/components/Footer/Footer';
import { easing } from '@/lib/animations';

export default function ContactPage() {
  const formRef = useRef<HTMLElement>(null);
  const formInView = useInView(formRef, { once: true, amount: 0.2 });

  return (
    <>
      <Header show />
      <FixedCTA show />

      <main>
        <InnerPageHero
          label="Grey Door"
          title="Contact"
          subtitle="Every relationship begins with a conversation. Tell us about your life, your needs, and how we can help."
        />

        <section
          ref={formRef}
          style={{
            position: 'relative',
            padding: 'clamp(4rem, 8vw, 8rem) clamp(2rem, 4vw, 4rem)',
            background: '#FAF8F5',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: 'clamp(3rem, 6vw, 6rem)',
              maxWidth: '1100px',
              margin: '0 auto',
              flexWrap: 'wrap' as const,
            }}
          >
            {/* Contact info */}
            <motion.div
              style={{ flex: 1, minWidth: '280px' }}
              initial={{ opacity: 0, y: 30 }}
              animate={formInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: easing.luxury }}
            >
              <h2
                style={{
                  fontFamily: "'Tenor Sans', Georgia, serif",
                  fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                  lineHeight: 1.15,
                  letterSpacing: '-0.01em',
                  textTransform: 'uppercase' as const,
                  color: '#1A1816',
                  marginBottom: '1.5rem',
                }}
              >
                Let&apos;s Begin
              </h2>

              <p
                style={{
                  fontFamily: "'Nexa', 'Helvetica Neue', sans-serif",
                  fontSize: 'clamp(0.9375rem, 1.1vw, 1.0625rem)',
                  lineHeight: 1.75,
                  color: '#3A3632',
                  maxWidth: '420px',
                  marginBottom: '2rem',
                }}
              >
                We work exclusively by referral and introduction, but we welcome every inquiry.
                Reach out and we&apos;ll arrange a time to speak.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '1.25rem' }}>
                {[
                  { label: 'Email', value: 'hello@greydoor.com', href: 'mailto:hello@greydoor.com' },
                  { label: 'Phone', value: '(713) 123-4567', href: 'tel:+17131234567' },
                  { label: 'Location', value: 'Houston, Texas', href: undefined },
                ].map((item) => (
                  <div key={item.label}>
                    <p
                      style={{
                        fontFamily: "'brandon-grotesque', sans-serif",
                        fontSize: '0.6875rem',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase' as const,
                        color: '#B0A89F',
                        fontWeight: 500,
                        marginBottom: '0.25rem',
                      }}
                    >
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        style={{
                          fontFamily: "'Nexa', 'Helvetica Neue', sans-serif",
                          fontSize: '1rem',
                          color: '#1A1816',
                          transition: 'color 0.3s ease',
                        }}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p
                        style={{
                          fontFamily: "'Nexa', 'Helvetica Neue', sans-serif",
                          fontSize: '1rem',
                          color: '#1A1816',
                        }}
                      >
                        {item.value}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Contact form */}
            <motion.div
              style={{ flex: 1, minWidth: '280px' }}
              initial={{ opacity: 0, y: 30 }}
              animate={formInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: easing.luxury, delay: 0.2 }}
            >
              <form
                style={{ display: 'flex', flexDirection: 'column' as const, gap: '1.5rem' }}
                onSubmit={(e) => e.preventDefault()}
              >
                {[
                  { name: 'name', label: 'Name', type: 'text' },
                  { name: 'email', label: 'Email', type: 'email' },
                  { name: 'phone', label: 'Phone', type: 'tel' },
                ].map((field) => (
                  <div key={field.name}>
                    <label
                      htmlFor={field.name}
                      style={{
                        fontFamily: "'brandon-grotesque', sans-serif",
                        fontSize: '0.6875rem',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase' as const,
                        color: '#B0A89F',
                        fontWeight: 500,
                        display: 'block',
                        marginBottom: '0.5rem',
                      }}
                    >
                      {field.label}
                    </label>
                    <input
                      id={field.name}
                      name={field.name}
                      type={field.type}
                      style={{
                        width: '100%',
                        padding: '0.875rem 0',
                        border: 'none',
                        borderBottom: '1px solid rgba(26,24,22,0.12)',
                        background: 'transparent',
                        fontFamily: "'Nexa', 'Helvetica Neue', sans-serif",
                        fontSize: '1rem',
                        color: '#1A1816',
                        outline: 'none',
                        transition: 'border-color 0.3s ease',
                      }}
                    />
                  </div>
                ))}

                <div>
                  <label
                    htmlFor="message"
                    style={{
                      fontFamily: "'brandon-grotesque', sans-serif",
                      fontSize: '0.6875rem',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase' as const,
                      color: '#B0A89F',
                      fontWeight: 500,
                      display: 'block',
                      marginBottom: '0.5rem',
                    }}
                  >
                    How can we help?
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    style={{
                      width: '100%',
                      padding: '0.875rem 0',
                      border: 'none',
                      borderBottom: '1px solid rgba(26,24,22,0.12)',
                      background: 'transparent',
                      fontFamily: "'Nexa', 'Helvetica Neue', sans-serif",
                      fontSize: '1rem',
                      color: '#1A1816',
                      outline: 'none',
                      resize: 'vertical' as const,
                      transition: 'border-color 0.3s ease',
                    }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    alignSelf: 'flex-start',
                    padding: '1rem 2.5rem',
                    background: '#1A1816',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '100px',
                    fontFamily: "'brandon-grotesque', sans-serif",
                    fontSize: '0.75rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase' as const,
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'background 0.4s ease, transform 0.3s ease',
                    marginTop: '0.5rem',
                  }}
                >
                  Send Inquiry
                </button>
              </form>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
