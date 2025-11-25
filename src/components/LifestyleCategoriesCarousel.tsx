'use client';

import Link from 'next/link';
import { Bone, Flame, Shield, Brain, BatteryLow, Moon } from 'lucide-react';
import { trackEvent } from '@/components/GoogleAnalytics';
import { motion } from 'framer-motion';
import { AutoCarousel } from '@/components/ui/AutoCarousel';

interface LifestyleItem {
  slug: string;
  name: string;
  tagline: string;
  Icon: React.ComponentType<{ className?: string }>;
}

const LIFESTYLE: LifestyleItem[] = [
  { slug: 'joint-pain', name: 'Joint Pain', tagline: 'Natural relief & joint support', Icon: Bone },
  { slug: 'inflammation', name: 'Inflammation', tagline: 'Natural anti-inflammatory support', Icon: Flame },
  { slug: 'low-immunity', name: 'Low Immunity', tagline: 'Boost defense & immune system', Icon: Shield },
  { slug: 'stress', name: 'Stress', tagline: 'Mental calm & stress management', Icon: Brain },
  { slug: 'fatigue', name: 'Fatigue', tagline: 'Energy boost & vitality support', Icon: BatteryLow },
  { slug: 'sleep-issues', name: 'Sleep Issues', tagline: 'Better rest & sleep quality', Icon: Moon },
];

export function LifestyleCategoriesCarousel() {
  const handleClick = (item: LifestyleItem) => {
    trackEvent('lifestyle_category_click', {
      category: item.slug,
      category_name: item.name,
    });
  };

  return (
    <section className="py-12 lg:py-20 bg-background" aria-labelledby="lifestyle-categories-heading">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-8 h-px bg-accent" />
            <p className="text-xs font-medium text-accent uppercase tracking-[0.3em]">Targeted Solutions</p>
            <div className="w-8 h-px bg-accent" />
          </div>
          <h2 id="lifestyle-categories-heading" className="text-4xl lg:text-5xl font-extralight text-foreground tracking-tight">
            Shop by <span className="block italic font-light text-accent/80 mt-2">Lifestyle</span>
          </h2>
          <p className="mt-4 text-lg font-light text-secondary max-w-2xl mx-auto leading-relaxed">
            Discover curated wellness solutions tailored to your unique lifestyle needs and health aspirations.
          </p>
        </div>
        <div className="relative">
          <AutoCarousel duration={40}>
            {LIFESTYLE.map((item, idx) => (
              <motion.div
                key={item.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                role="listitem"
                className="flex-shrink-0 w-64"
              >
                <Link
                  href={`/products?category=${item.slug}`}
                  onClick={() => handleClick(item)}
                  className="group block border border-border bg-card hover:border-accent transition-colors duration-300 rounded-2xl overflow-hidden h-full"
                >
                  <div className="p-8 flex flex-col items-center text-center gap-4 h-full">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-accent/10 blur-sm" />
                      <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-accent/20 via-accent/10 to-accent/5 flex items-center justify-center group-hover:from-accent/30 group-hover:via-accent/20 group-hover:to-accent/10 transition-all">
                        <item.Icon className="w-10 h-10 text-accent" />
                      </div>
                    </div>
                    <h3 className="text-xl font-medium text-foreground tracking-tight">{item.name}</h3>
                    <p className="text-base font-light text-secondary/80 leading-relaxed flex-grow">
                      {item.tagline}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AutoCarousel>
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}

export default LifestyleCategoriesCarousel;
