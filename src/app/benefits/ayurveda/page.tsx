'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function BenefitsAyurvedaPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      <Header />
      <main className="py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <h1 className="text-3xl font-light text-[#111111] mb-6">Benefits of Ayurveda</h1>
          <p className="text-[#666666]">Detailed content is coming soon.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
