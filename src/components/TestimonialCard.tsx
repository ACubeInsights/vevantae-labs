'use client'

import { Testimonial } from '@/lib/supabase'
import { Star } from 'lucide-react'

interface TestimonialCardProps {
  testimonial: Testimonial
  className?: string
}

export function TestimonialCard({ testimonial, className = '' }: TestimonialCardProps) {
  return (
    <div className={`bg-white p-8 border border-border ${className}`}>
      <div className="space-y-4">
        {/* Star rating */}
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className={`w-4 h-4 ${
                index < testimonial.rating
                  ? 'fill-amber text-amber'
                  : 'text-border'
              }`}
            />
          ))}
        </div>
        
        {/* Testimonial text */}
        <blockquote className="text-secondary leading-relaxed italic">
          "{testimonial.comment}"
        </blockquote>
        
        {/* Author */}
        <div className="pt-4 border-t border-border">
          <cite className="text-primary font-semibold not-italic">
            {testimonial.name}
          </cite>
        </div>
      </div>
    </div>
  )
}