import type { Metadata } from 'next';
import '@/styles/globals.scss';
import { TransitionProvider } from '@/components/PageTransition/TransitionContext';
import TransitionOverlay from '@/components/PageTransition/TransitionOverlay';

export const metadata: Metadata = {
  title: 'Gray Door — Luxury Concierge & Lifestyle Management | Houston',
  description:
    'Gray Door is a premium concierge and lifestyle management agency in Houston, Texas. Bespoke personal assistance, travel coordination, event planning, and more for discerning individuals and families.',
  keywords: [
    'luxury concierge Houston',
    'lifestyle management',
    'personal assistant Houston',
    'bespoke concierge services',
    'Gray Door',
  ],
  openGraph: {
    title: 'Gray Door — Luxury Concierge & Lifestyle Management',
    description:
      'Bespoke concierge and lifestyle management for discerning individuals and families in Houston.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/kgn1kgq.css" />
        <link rel="preconnect" href="https://use.typekit.net" crossOrigin="anonymous" />
      </head>
      <body>
        <TransitionProvider>
          <TransitionOverlay />
          {children}
        </TransitionProvider>
      </body>
    </html>
  );
}
