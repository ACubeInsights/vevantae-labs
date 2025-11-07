import { InfiniteSlider } from '@/components/ui/infinite-slider';
import Image from 'next/image';

function InfiniteSliderCertificates() {
  const certificateLogos = [
    { src: '/certificates2/ISO-certificate.avif', alt: 'ISO 9001 Certificate' },
    { src: '/certificates2/ayush-certificate.avif', alt: 'AYUSH Certificate' },
    { src: '/certificates2/cruelty-free-certificate.avif', alt: 'Cruelty-Free Certificate' },
    { src: '/certificates2/gmp-certificate.avif', alt: 'GMP Certificate' },
    { src: '/certificates2/make-in-india-certificate.avif', alt: 'Make in India Certificate' },
  ];

  return (
    <InfiniteSlider
      gap={24}
      reverse
      className="w-full h-full bg-card py-6 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] [mask-size:100%_100%] [-webkit-mask-size:100%_100%]"
    >
      {certificateLogos.map((logo) => (
        <Image
          key={logo.alt}
          src={logo.src}
          alt={logo.alt}
          width={180}
          height={101}
          className="h-[101px] w-auto object-contain opacity-80 transition-all duration-300 hover:opacity-100 [filter:grayscale(1)_sepia(1)_saturate(.65)_hue-rotate(330deg)_brightness(1.05)_contrast(1.1)] hover:[filter:none]"
        />
      ))}
    </InfiniteSlider>
  );
}

const demoComponents = {
  InfiniteSliderCertificates,
};

export default demoComponents;
