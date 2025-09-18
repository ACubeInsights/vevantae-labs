'use client';

import { useState, useEffect } from 'react';

interface CrispImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  onLoad?: () => void;
}

export default function CrispImage({ src, alt, className, width, height, onLoad }: CrispImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState<string>('');

  useEffect(() => {
    // Preload the image
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      setImageSrc(src);
      setIsLoaded(true);
      onLoad?.();
    };
    
    img.onerror = () => {
      setImageSrc(src); // Still set the src even if preload fails
      setIsLoaded(true);
    };
    
    img.src = src;
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, onLoad]);

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      width={width}
      height={height}
      style={{
        imageRendering: 'crisp-edges',
        filter: 'none',
        transition: 'none',
        opacity: isLoaded ? 1 : 0,
        display: 'block',
        backfaceVisibility: 'hidden',
        transform: 'translateZ(0)',
        willChange: 'auto'
      }}
      loading="eager"
      decoding="sync"
      draggable={false}
    />
  );
}