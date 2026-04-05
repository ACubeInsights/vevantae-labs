'use client';

import Link from 'next/link';
import { Brain, Heart, Baby, Pill, PersonStanding, Bone } from 'lucide-react';
import { trackEvent } from '@/components/GoogleAnalytics';
import { motion } from 'framer-motion';

// Uterus icon for Gynaecology
const UterusIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 4v6" />
    <path d="M12 10c0 2 0 4 0 6c0 2 1 4 1 4" />
    <path d="M12 10c-2 0-4-1-5-3c-1-2-1-4 1-5c2-1 3 1 3 3" />
    <path d="M12 10c2 0 4-1 5-3c1-2 1-4-1-5c-2-1-3 1-3 3" />
    <circle cx="5" cy="5" r="1.5" />
    <circle cx="19" cy="5" r="1.5" />
  </svg>
);

// Sperm cell icon for Andrology (male reproductive health)
const SpermIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="8" cy="6" rx="4" ry="3" fill="currentColor" />
    <path d="M12 6c2 1 4 4 4 7c0 3-2 6-4 8" strokeWidth="2" />
    <path d="M16 13c1 1 2 0 2-1" />
  </svg>
);

interface CategoryItem {
  slug: string;
  name: string;
  Icon: React.ComponentType<{ className?: string }>;
}

const CATEGORIES: CategoryItem[] = [
  { slug: 'neurology', name: 'Neurology', Icon: Brain },
  { slug: 'cardiology', name: 'Cardiology', Icon: Heart },
  { slug: 'internal-care', name: 'Internal Care', Icon: PersonStanding },
  { slug: 'gynaecology', name: 'Gynaecology', Icon: UterusIcon },
  { slug: 'orthopaedics', name: 'Orthopaedics', Icon: Bone },
  { slug: 'paediatrics', name: 'Paediatrics', Icon: Baby },
  { slug: 'andrology', name: 'Andrology', Icon: SpermIcon },
  { slug: 'generic', name: 'Generic', Icon: Pill },
];

export function ShopByCategories() {
  const handleClick = (item: CategoryItem) => {
    trackEvent('medical_category_click', {
      category: item.slug,
      category_name: item.name,
    });
  };

  return (
    <section className="py-12 lg:py-20 bg-background" aria-labelledby="shop-categories-heading">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-8 h-px bg-accent" />
            <p className="text-xs font-medium text-accent uppercase tracking-[0.3em]">Medical Specialties</p>
            <div className="w-8 h-px bg-accent" />
          </div>
          <h2 id="shop-categories-heading" className="text-4xl lg:text-5xl font-extralight text-foreground tracking-tight">
            Shop by <span className="block italic font-light text-accent/80 mt-2">Categories</span>
          </h2>
          <p className="mt-4 text-lg font-light text-secondary max-w-2xl mx-auto leading-relaxed">
            Explore our specialized formulations across different medical categories.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6 lg:gap-8">
          {CATEGORIES.map((item, idx) => (
            <motion.div
              key={item.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
            >
              <Link
                href={`/products?category=${item.slug}`}
                onClick={() => handleClick(item)}
                className="group flex flex-col items-center text-center gap-3"
              >
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-accent/10 blur-md group-hover:bg-accent/20 transition-all" />
                  <div className="relative w-20 h-20 lg:w-24 lg:h-24 rounded-full border-2 border-border bg-card group-hover:border-accent group-hover:shadow-lg flex items-center justify-center transition-all duration-300">
                    <item.Icon className="w-8 h-8 lg:w-10 lg:h-10 text-accent" />
                  </div>
                </div>
                <h3 className="text-sm font-medium text-foreground tracking-tight group-hover:text-accent transition-colors">
                  {item.name}
                </h3>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ShopByCategories;
