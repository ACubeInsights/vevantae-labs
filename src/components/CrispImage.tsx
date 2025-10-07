'use client';

import { useState, useEffect } from 'react';
import NextImage from 'next/image';

interface CrispImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  onLoad?: () => void;
}

export default function CrispImage({
  src,
  alt,
  className,
  width,
  height,
  onLoad,
}: CrispImageProps) {
  const [, setIsLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState<string>('');

  useEffect(() => {
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
    <NextImage
      src={imageSrc || src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      priority
      draggable={false}
    />
  );
}
