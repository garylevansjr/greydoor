'use client';

import { useState, useEffect } from 'react';
import LoaderIntro from '@/components/LoaderIntro/LoaderIntro';
import Header from '@/components/Header/Header';
import FixedCTA from '@/components/FixedCTA/FixedCTA';
import Hero from '@/components/Hero/Hero';
import Testimonial from '@/components/Testimonial/Testimonial';
import Services from '@/components/Services/Services';
import AboutLauren from '@/components/AboutLauren/AboutLauren';
import Footer from '@/components/Footer/Footer';

export default function Home() {
  const [loaderComplete, setLoaderComplete] = useState(false);
  const [headerReady, setHeaderReady] = useState(false);

  useEffect(() => {
    if (!loaderComplete) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      document.documentElement.style.position = 'fixed';
      document.documentElement.style.inset = '0';
      document.documentElement.style.width = '100%';
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.documentElement.style.position = '';
      document.documentElement.style.inset = '';
      document.documentElement.style.width = '';
    }
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.documentElement.style.position = '';
      document.documentElement.style.inset = '';
      document.documentElement.style.width = '';
    };
  }, [loaderComplete]);

  return (
    <>
      <LoaderIntro onComplete={() => setLoaderComplete(true)} />

      <Header show={headerReady} />
      <FixedCTA show={headerReady} />

      <main>
        <Hero show={loaderComplete} onHeaderReady={() => setHeaderReady(true)} />
        <Testimonial />
        <Services />
        <AboutLauren />
      </main>

      <Footer />
    </>
  );
}
