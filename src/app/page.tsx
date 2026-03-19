'use client';

import { useState } from 'react';
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

  return (
    <>
      <LoaderIntro onComplete={() => setLoaderComplete(true)} />

      <Header show={loaderComplete} />
      <FixedCTA show={loaderComplete} />

      <main>
        <Hero show={loaderComplete} />
        <Testimonial />
        <Services />
        <AboutLauren />
      </main>

      <Footer />
    </>
  );
}
