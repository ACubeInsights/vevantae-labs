import type { Metadata, Viewport } from 'next';
import { Suspense } from 'react';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';

const inter = Inter({
  variable: '--font-suisse',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Vevantae Labs - Ancient Wisdom, Modern Wellness',
  description:
    'Discover premium ayurvedic and nutraceutical products that bridge ancient wisdom with modern science for holistic wellness.',
  keywords: 'ayurveda, nutraceuticals, wellness, natural health, supplements, herbal medicine',
  authors: [{ name: 'Vevantae Labs' }],
  openGraph: {
    title: 'Vevantae Labs - Ancient Wisdom, Modern Wellness',
    description:
      'Discover premium ayurvedic and nutraceutical products that bridge ancient wisdom with modern science for holistic wellness.',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vevantae Labs - Ancient Wisdom, Modern Wellness',
    description:
      'Discover premium ayurvedic and nutraceutical products that bridge ancient wisdom with modern science for holistic wellness.',
  },
  robots: 'index, follow',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased bg-background text-primary`}>
        <Suspense fallback={null}>
        </Suspense>
        <Header />
        <main>
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
