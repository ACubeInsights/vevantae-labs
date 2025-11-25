'use client';

import Link from 'next/link';
import { ShieldCheck, Brain, Moon, HeartPulse, Activity, Syringe, Leaf, Zap } from 'lucide-react';
import { trackEvent } from '@/components/GoogleAnalytics';
import { motion } from 'framer-motion';
import { AutoCarousel } from '@/components/ui/AutoCarousel';

// Data shape for a condition card
interface ConditionItem {
  slug: string; // query param value
  name: string;
  tagline: string;
  Icon: React.ComponentType<{ className?: string }>;
}

const CONDITIONS: ConditionItem[] = [
  { slug: 'immunity', name: 'Immunity', tagline: 'Defense & resilience', Icon: ShieldCheck },
  { slug: 'cognitive', name: 'Cognitive', tagline: 'Focus & clarity', Icon: Brain },
  { slug: 'sleep', name: 'Sleep', tagline: 'Rest & recovery', Icon: Moon },
  { slug: 'heart', name: 'Heart', tagline: 'Cardio wellness', Icon: HeartPulse },
  { slug: 'stress', name: 'Stress', tagline: 'Calm & balance', Icon: Activity },
  { slug: 'inflammation', name: 'Inflammation', tagline: 'Natural relief', Icon: Syringe },
  { slug: 'digestion', name: 'Digestion', tagline: 'Gut harmony', Icon: Leaf },
  { slug: 'energy', name: 'Energy', tagline: 'Vitality support', Icon: Zap },
];

export function HealthConditionsCarousel() {
  const handleClick = (item: ConditionItem) => {
    trackEvent('health_condition_click', {
      condition: item.slug,
      condition_name: item.name,
    });
  };

  return (
    <section className="py-12 lg:py-20 bg-background" aria-labelledby="health-conditions-heading">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-8 h-px bg-accent" />
            <p className="text-xs font-medium text-accent uppercase tracking-[0.3em]">Targeted Support</p>
            <div className="w-8 h-px bg-accent" />
          </div>
          <h2 id="health-conditions-heading" className="text-4xl lg:text-5xl font-extralight text-foreground tracking-tight">
            Shop by <span className="italic font-light text-accent/80">Health Condition</span>
          </h2>
          <p className="text-lg font-light text-secondary max-w-2xl mx-auto leading-relaxed">
            Explore precise formulations designed for specific health needs.
          </p>
        </div>
        <AutoCarousel duration={60}>
          {CONDITIONS.map((item, idx) => (
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
                href={`/products?health_conditions=${item.slug}`}
                onClick={() => handleClick(item)}
                className="group block border border-border bg-card hover:border-accent transition-colors duration-300 rounded-sm overflow-hidden h-full"
              >
                <div className="p-8 flex flex-col items-center text-center gap-4 h-full">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-accent/10 blur-sm" />
                    <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-accent/20 via-accent/10 to-accent/5 flex items-center justify-center group-hover:from-accent/30 group-hover:via-accent/20 group-hover:to-accent/10 transition-all">
                      <item.Icon className="w-10 h-10 text-accent" />
                    </div>
                  </div>
                  <h3 className="text-xl font-light text-foreground tracking-tight">{item.name}</h3>
                  <p className="text-base font-light text-secondary/80 leading-relaxed flex-grow">
                    {item.tagline}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </AutoCarousel>
      </div>
    </section>
  );
}

export default HealthConditionsCarousel;
