'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Product } from '@/lib/supabase';
import { Button } from '@/components/ui/Button';
import { trackEvent } from './GoogleAnalytics';

const ChevronLeft = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

const ChevronRight = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className = '' }: ProductCardProps) {
  const images = product.images || [];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Track product click
  const handleProductClick = () => {
    trackEvent('product_click', {
      product_id: product.id,
      product_name: product.name || 'Unknown Product',
      product_category: product.category || 'Unknown',
      product_price: product.selling_price || 0,
      click_source: 'product_card'
    });
  };

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const currentImage =
    images.length > 0
      ? images[currentImageIndex]
      : 'https://via.placeholder.com/340x340/F8F6F3/8B7355?text=No+Image';

  return (
    <div className={`group cursor-pointer h-full flex flex-col ${className}`}>
      <Link href={`/products/${product.id}`} onClick={handleProductClick} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-white">
          <Image
            src={currentImage}
            alt={product.name || 'Product'}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />

          
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-700 hover:text-gray-900 rounded-full p-2 opacity-70 hover:opacity-100 transition-all duration-200 shadow-lg z-10"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-700 hover:text-gray-900 rounded-full p-2 opacity-70 hover:opacity-100 transition-all duration-200 shadow-lg z-10"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          
          {images.length > 1 && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
              {images.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}

          
          <div className="absolute top-4 left-4">
            <span className="bg-background/90 text-primary px-3 py-1 text-xs uppercase tracking-wider font-semibold">
              {product.category === 'ayurvedic' ? 'Ayurvedic' : 'Nutraceutical'}
            </span>
          </div>
        </div>

        <div className="pt-6 space-y-2 flex-1 flex flex-col">
          <h3 className="text-lg font-semibold text-primary group-hover:text-secondary transition-colors duration-200">
            {product.name}
          </h3>

          <p className="text-secondary text-sm line-clamp-2 leading-relaxed">
            {product.short_description || product.description}
          </p>

          {product.health_benefits && product.health_benefits.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-2">
              {product.health_benefits.slice(0, 2).map((benefit, index) => (
                <span key={index} className="text-xs text-olive bg-olive/10 px-2 py-1 rounded-sm">
                  {benefit}
                </span>
              ))}
            </div>
          )}

          <div className="pt-4 mt-auto">
            <div className="flex items-center justify-between mb-2">
              {product.mrp && product.selling_price && product.mrp > product.selling_price && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-secondary line-through">₹{product.mrp}</span>
                  <span className="text-lg font-semibold text-primary">
                    ₹{product.selling_price}
                  </span>
                </div>
              )}
              {(!product.mrp || product.mrp <= product.selling_price) && (
                <span className="text-lg font-semibold text-primary">₹{product.selling_price}</span>
              )}
              {product.average_rating && product.average_rating > 0 && (
                <div className="flex items-center gap-1">
                  <span className="text-sm text-secondary">★</span>
                  <span className="text-sm text-secondary">{product.average_rating}</span>
                  {product.total_reviews && product.total_reviews > 0 && (
                    <span className="text-xs text-secondary">({product.total_reviews})</span>
                  )}
                </div>
              )}
            </div>

            <Button
              variant="outline"
              size="sm"
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 w-full"
            >
              Learn More & Inquire
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
}
