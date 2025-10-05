'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function QualityPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      <Header />
      <main className="py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <h1 className="text-3xl font-light text-[#111111] mb-6">Quality Standards</h1>
          <p className="text-[#666666]">
            Information about our quality standards will be available soon.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
