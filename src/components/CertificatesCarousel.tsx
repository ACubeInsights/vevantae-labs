'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { InfiniteSlider } from '@/components/ui/infinite-slider'

interface Certificate {
  id: string
  src: string
  alt: string
  label: string
  description: string
}

const certificates: Certificate[] = [
  {
    id: 'iso',
    src: '/certificates2/ISO-certificate.avif',
    alt: 'ISO 9001 Certificate',
    label: 'ISO 9001:2015 Quality Management',
    description: 'ISO 9001:2015 - Our products meet international quality management system standards.'
  },
  {
    id: 'ayush',
    src: '/certificates2/ayush-certificate.avif',
    alt: 'AYUSH Certificate',
    label: 'AYUSH Ministry Approved',
    description: 'AYUSH Approved - All traditional formulations are certified by Ministry of AYUSH, India.'
  },
  {
    id: 'cruelty-free',
    src: '/certificates2/cruelty-free-certificate.avif',
    alt: 'Cruelty-Free Certificate',
    label: 'Cruelty-Free Certified',
    description: 'Cruelty-Free - All our products are ethically made with no animal testing.'
  },
  {
    id: 'gmp',
    src: '/certificates2/gmp-certificate.avif',
    alt: 'GMP Certificate',
    label: 'Good Manufacturing Practice',
    description: 'Good Manufacturing Practice - Our products are manufactured and controlled according to quality standards.'
  },
  {
    id: 'make-in-india',
    src: '/certificates2/make-in-india-certificate.avif',
    alt: 'Make in India Certificate',
    label: 'Made in India',
    description: 'Made in India - Proudly manufactured in India supporting local communities.'
  }
]

interface CertificatesCarouselProps {
  className?: string
}

export function CertificatesCarousel({ className = '' }: CertificatesCarouselProps) {
  const [hoveredCert, setHoveredCert] = useState<Certificate | null>(null)

  const handleCertificateHover = (cert: Certificate | null) => {
    setHoveredCert(cert)
  }

  return (
    <div className={`relative ${className}`}>
      <div className="mx-auto w-full max-w-[80vw] lg:max-w-[70vw]">
        <InfiniteSlider
          gap={80}
          reverse
          duration={25}
          durationOnHover={100}
          paused={hoveredCert !== null}
      className="w-full py-px lg:py-px [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] [mask-size:100%_100%] [-webkit-mask-size:100%_100%]"
        >
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="inline-block"
              onMouseEnter={() => handleCertificateHover(cert)}
              onMouseLeave={() => handleCertificateHover(null)}
            >
              <Image 
                src={cert.src} 
                alt={cert.alt}
                width={100}
                height={100}
                className="h-[6rem] w-auto object-contain opacity-75 transition-all duration-500 hover:opacity-100 hover:scale-105 [filter:grayscale(1)_sepia(1)_saturate(.65)_hue-rotate(330deg)_brightness(1.05)_contrast(1.1)] hover:[filter:none] cursor-pointer" 
              />
            </div>
          ))}
        </InfiniteSlider>
      </div>

      
      <div className="h-12 flex items-center justify-center mt-8">
        <AnimatePresence>
          {hoveredCert && (
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.4 }}
              className="text-base lg:text-lg text-[#666666] italic text-center max-w-4xl px-6 leading-relaxed"
            >
              &ldquo;{hoveredCert.description}&rdquo;
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
