'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      <Header />
      <main className="py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <h1 className="text-3xl font-light text-[#111111] mb-6">Cookie Policy</h1>
          <p className="text-[#666666]">Our cookie policy will be published soon.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
