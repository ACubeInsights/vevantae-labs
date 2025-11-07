'use client';

import { Testimonial } from '@/lib/supabase';
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
}

export function TestimonialCard({ testimonial, className = '' }: TestimonialCardProps) {
  return (
    <div className={`bg-card p-8 border border-border h-full flex flex-col ${className}`}>
      <div className="flex-1 flex flex-col justify-between">
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className={`w-4 h-4 ${
                index < testimonial.rating ? 'fill-amber text-amber' : 'text-border'
              }`}
            />
          ))}
        </div>

        <blockquote className="text-secondary leading-relaxed italic">
          &quot;{testimonial.comment}&quot;
        </blockquote>

        <div className="pt-4 border-t border-border">
          <cite className="text-primary font-semibold not-italic">{testimonial.name}</cite>
        </div>
      </div>
    </div>
  );
}
