'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Product } from '@/lib/supabase'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/Button'

// Custom arrow components
const ChevronLeft = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
)

const ChevronRight = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
)

interface ProductCardProps {
  product: Product
  className?: string
}

export function ProductCard({ product, className = '' }: ProductCardProps) {
  const images = product.images || []
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }
  
  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }
  
  const currentImage = images.length > 0 ? images[currentImageIndex] : 'https://via.placeholder.com/340x340/F8F6F3/8B7355?text=No+Image'
  
  return (
    <div className={`group cursor-pointer ${className}`}>
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative overflow-hidden bg-white">
          <Image
            src={currentImage}
            alt={product.name || 'Product'}
            width={340}
            height={340}
            className="w-full h-[340px] object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          
          {/* Navigation arrows - only show if there are multiple images */}
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
          
          {/* Image indicators */}
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
          
          {/* Category badge */}
          <div className="absolute top-4 left-4">
            <span className="bg-background/90 text-primary px-3 py-1 text-xs uppercase tracking-wider font-semibold">
              {product.category === 'ayurvedic' ? 'Ayurvedic' : 'Nutraceutical'}
            </span>
          </div>
        </div>
        
        <div className="pt-6 space-y-2">
          <h3 className="text-lg font-semibold text-primary group-hover:text-secondary transition-colors duration-200">
            {product.name}
          </h3>
          
          <p className="text-secondary text-sm line-clamp-2 leading-relaxed">
            {product.description}
          </p>
          
          {product.benefits && product.benefits.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-2">
              {product.benefits.slice(0, 2).map((benefit, index) => (
                <span
                  key={index}
                  className="text-xs text-olive bg-olive/10 px-2 py-1 rounded-sm"
                >
                  {benefit}
                </span>
              ))}
            </div>
          )}
          
          <div className="flex items-center justify-between pt-4">
            <span className="text-xl font-semibold text-primary">
              {product.price ? formatPrice(product.price) : 'Price not available'}
            </span>
            
            <Button 
              variant="outline" 
              size="sm"
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              View Details
            </Button>
          </div>
        </div>
      </Link>
    </div>
  )
}