'use client';

import { useEffect, useState } from 'react';

// Force dynamic rendering to avoid build-time issues
export const dynamic = 'force-dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { ArrowRight, Plus } from 'lucide-react';
import { getProducts, Product, getBlogPosts, BlogPost } from '@/lib/supabase';
import { BlogCard } from '@/components/BlogCard';
import { CertificatesCarousel } from '@/components/CertificatesCarousel';
import { TestimonialCarousel } from '@/components/ui/testimonial-carousel';
import { LifestyleCategoriesCarousel } from '@/components/LifestyleCategoriesCarousel';

function getValidImageUrl(imageUrl: string | undefined): string | null {
  if (!imageUrl) return null;

  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }

  return null;
}

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await getProducts({ is_featured: true });
        if (products.length === 0) {
          const allProducts = await getProducts();
          setFeaturedProducts(allProducts.slice(0, 3));
        } else {
          setFeaturedProducts(products.slice(0, 3));
        }

        const posts = await getBlogPosts();
        setBlogPosts(posts.slice(0, 3));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-background">

      <section className="relative overflow-hidden bg-background min-h-screen hero-offset">

        <div className="absolute inset-0 overflow-hidden">

          <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-accent/5" />
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-accent/3 to-muted/10" />


          {[...Array(12)].map((_, i) => {
            const positions = [
              { left: 15, top: 20 },
              { left: 85, top: 15 },
              { left: 25, top: 80 },
              { left: 70, top: 25 },
              { left: 45, top: 90 },
              { left: 90, top: 60 },
              { left: 10, top: 50 },
              { left: 60, top: 10 },
              { left: 35, top: 70 },
              { left: 80, top: 85 },
              { left: 55, top: 40 },
              { left: 20, top: 65 },
            ];
            const durations = [4, 5, 6, 7, 4.5, 5.5, 6.5, 7.5, 4.2, 5.8, 6.2, 7.2];
            const delays = [0, 0.5, 1, 1.5, 0.3, 0.8, 1.3, 1.8, 0.2, 0.7, 1.2, 1.7];

            return (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-accent/30 rounded-full"
                style={{
                  left: `${positions[i].left}%`,
                  top: `${positions[i].top}%`,
                }}
                animate={{
                  y: [-20, 20, -20],
                  x: [-10, 10, -10],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: durations[i],
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: delays[i],
                }}
              />
            );
          })}


          <motion.div
            className="absolute top-1/4 right-1/4 w-32 h-32 border border-accent/10 rotate-45"
            animate={{ rotate: [45, 135, 45] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute bottom-1/3 left-1/4 w-24 h-24 border border-accent/5 rounded-full"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <div className="relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 min-h-screen max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="lg:col-span-12 xl:col-span-12 flex flex-col justify-center py-16 sm:py-20 lg:py-32 lg:pr-8 xl:pr-16 relative z-30 order-2 lg:order-1 lg:max-w-2xl"
            >
              <div className="space-y-16">
                {/* Mobile Tile Wrapper / Desktop Text Container */}
                <div className="relative min-h-[600px] sm:min-h-[700px] lg:min-h-0 lg:aspect-auto flex flex-col justify-center items-start text-left p-6 sm:p-10 lg:p-0 lg:block lg:text-left lg:bg-transparent">

                  {/* Mobile Background Image (Hidden on Desktop) */}
                  <div className="absolute inset-0 lg:hidden z-0">
                    <div className="relative w-full h-full border-2 border-accent/20 rounded-sm overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-accent/20 via-transparent to-transparent z-10" />
                      <div className="absolute inset-0 bg-[#F1E5D4]/50 mix-blend-screen z-10 pointer-events-none" />
                      <div className="absolute inset-0 bg-[rgba(139,115,85,0.28)] mix-blend-soft-light z-10 pointer-events-none" />
                      <div className="absolute inset-0 bg-[#F3E8D8]/35 mix-blend-screen z-20 pointer-events-none" />
                      <Image
                        src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Soft beige minimalist texture background"
                        fill
                        className="object-cover shadow-2xl opacity-100 brightness-110"
                        priority
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                      />
                    </div>
                  </div>

                  <div className="relative z-10 space-y-10 w-full">
                    <div className="space-y-6">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="flex items-center justify-start gap-4"
                      >
                        <div className="w-8 h-px bg-accent" />
                        <p className="text-xs font-medium text-accent uppercase tracking-[0.3em]">
                          New Collection
                        </p>
                      </motion.div>

                      <motion.h1
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extralight text-foreground leading-[0.85] tracking-tight"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                      >
                        <motion.span
                          initial={{ y: 30, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.8, delay: 0.7 }}
                          className="block"
                        >
                          Formulations
                        </motion.span>
                        <motion.span
                          initial={{ y: 30, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.8, delay: 0.9 }}
                          className="block italic font-light text-accent/80"
                        >
                          for the
                        </motion.span>
                        <motion.span
                          initial={{ y: 30, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.8, delay: 1.1 }}
                          className="block relative"
                        >
                          curious
                          <motion.div
                            className="absolute -bottom-2 left-0 h-px bg-accent"
                            initial={{ width: 0 }}
                            animate={{ width: '60%' }}
                            transition={{ duration: 1, delay: 1.5 }}
                          />
                        </motion.span>
                      </motion.h1>
                    </div>

                    <motion.p
                      className="text-lg sm:text-xl font-light text-secondary leading-relaxed max-w-lg mr-auto lg:mx-0 tracking-wide"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 1.3 }}
                    >
                      Explore our collection of meticulously crafted formulations, each designed to
                      elevate the everyday ritual into something extraordinary.
                    </motion.p>
                  </div>
                </div>

                <motion.div
                  className="flex flex-col sm:flex-row gap-6 px-6 sm:px-10 lg:px-0 justify-start"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.6 }}
                >
                  <Link
                    href="/products"
                    className="group relative inline-flex items-center justify-center px-10 py-5 bg-primary text-primary-foreground text-sm font-medium uppercase tracking-[0.15em] overflow-hidden transition-all duration-500 hover:shadow-xl"
                  >
                    <motion.div
                      className="absolute inset-0 bg-accent"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                    <span className="relative z-10">Discover Collection</span>
                    <ArrowRight className="relative z-10 ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    href="/about"
                    className="group inline-flex items-center justify-center px-10 py-5 border border-border text-foreground text-sm font-medium uppercase tracking-[0.15em] hover:border-accent hover:bg-accent/5 transition-all duration-500 backdrop-blur-sm"
                  >
                    <span>Our Story</span>
                    <motion.div
                      className="ml-3 w-4 h-4"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                    >
                      <Plus className="w-4 h-4" />
                    </motion.div>
                  </Link>
                </motion.div>
              </div>
            </motion.div>


            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.4, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="hidden lg:flex lg:col-span-6 xl:col-span-7 relative items-center justify-center z-5 order-1 lg:order-2 lg:absolute lg:inset-0 lg:w-full lg:h-full"
            >
              <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-full lg:w-3/5 lg:ml-auto aspect-[4/5] lg:aspect-[3/4] lg:h-4/5 lg:self-center">

                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-muted/20 to-accent/5 rounded-sm lg:opacity-60"
                  animate={{
                    background: [
                      'linear-gradient(135deg, rgba(232, 230, 224, 0.2) 0%, rgba(139, 115, 85, 0.05) 100%)',
                      'linear-gradient(135deg, rgba(139, 115, 85, 0.05) 0%, rgba(232, 230, 224, 0.2) 100%)',
                      'linear-gradient(135deg, rgba(232, 230, 224, 0.2) 0%, rgba(139, 115, 85, 0.05) 100%)',
                    ],
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                />


                <div className="absolute inset-0 p-2 sm:p-4">
                  <motion.div
                    className="relative w-full h-full group border-2 border-accent/20 rounded-sm overflow-hidden"
                    whileHover={{ scale: 1.02, borderColor: 'rgba(139, 115, 85, 0.4)' }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-accent/20 via-transparent to-transparent z-10" />
                    <div className="absolute inset-0 bg-[#F1E5D4]/50 mix-blend-screen z-10 pointer-events-none" />
                    <div className="absolute inset-0 bg-[rgba(139,115,85,0.28)] mix-blend-soft-light z-10 pointer-events-none" />
                    <div className="absolute inset-0 bg-[#F3E8D8]/35 mix-blend-screen z-20 pointer-events-none" />
                    <Image
                      src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="Soft beige minimalist texture background"
                      fill
                      className="object-cover shadow-2xl opacity-100 brightness-110"
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                    />


                    <motion.div
                      className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-all duration-700"
                      whileHover={{
                        boxShadow: 'inset 0 0 0 1px rgba(139, 115, 85, 0.3)',
                      }}
                    />


                    <motion.div
                      className="absolute top-8 right-8 w-3 h-3 bg-accent rounded-full shadow-lg z-20"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <motion.div
                      className="absolute bottom-12 left-8 w-2 h-2 bg-accent/60 rounded-full z-20"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                    />
                  </motion.div>
                </div>


                <motion.div
                  className="absolute top-1/4 -right-4 w-16 h-16 border border-accent/20 rounded-full"
                  animate={{
                    y: [-10, 10, -10],
                    rotate: [0, 180, 360],
                  }}
                  transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                  className="absolute bottom-1/4 -left-4 w-12 h-12 bg-accent/5 rounded-sm"
                  animate={{
                    x: [-5, 5, -5],
                    rotate: [0, -90, 0],
                  }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                />
              </div>
            </motion.div>
          </div>
        </div>


        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
        >
          <motion.div
            className="w-px h-8 bg-accent/50"
            animate={{ scaleY: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
  </section>


      
      <section className="bg-background pt-px lg:pt-px pb-0 lg:pb-0 lg:-mt-2">
        <div className="container mx-auto px-6 lg:px-8">
          <CertificatesCarousel />
        </div>
      </section>


      <section className="pt-6 lg:pt-8 pb-24 lg:pb-32 bg-background">
        <div className="w-full px-0">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16 lg:mb-20 text-center"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-8 h-px bg-accent" />
                <p className="text-xs font-medium text-accent uppercase tracking-[0.3em]">
                  Explore Collections
                </p>
                <div className="w-8 h-px bg-accent" />
              </div>
              <h2 className="text-4xl lg:text-5xl font-extralight text-foreground tracking-tight">
                Discover Your Path to
                <span className="block italic font-light text-accent/80 mt-2">Wellness</span>
              </h2>
              <p className="text-lg font-light text-secondary max-w-2xl mx-auto leading-relaxed">
                Choose from our carefully curated collections, each designed to support your unique
                wellness journey.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Link href="/products?category=ayurvedic" className="group block">
                <div className="relative aspect-square overflow-hidden bg-accent transition-all duration-700 group-hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] group-hover:scale-[1.02]">

                  {/* Background Image */}
                  <Image
                    src="/images/ayurvedic-bg.jpg"
                    alt="Ayurvedic Solutions"
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />

                  {/* Overlays for readability and mood */}
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent opacity-40" />

                  {/* Decorative elements */}
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]" />



                  {/* Content */}
                  <div className="relative h-full flex flex-col justify-end items-center text-center p-8 lg:p-10">
                    <div className="space-y-6 pb-24">
                      <div className="space-y-3">

                        <div className="w-16 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent mx-auto" />

                        <h3 className="font-sans text-3xl lg:text-4xl font-medium text-white tracking-tight leading-tight drop-shadow-lg">
                          Ayurvedic Solutions
                        </h3>
                        <p className="font-sans text-white font-normal leading-relaxed max-w-sm mx-auto text-sm lg:text-base drop-shadow-md">
                          Ancient wisdom meets modern science in our traditional formulations.
                        </p>


                        <div className="flex items-center justify-center space-x-2 pt-2">
                          <div className="w-1 h-1 bg-white/80 rounded-full" />
                          <div className="w-2 h-px bg-white/70" />
                          <div className="w-1 h-1 bg-white/80 rounded-full" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Button */}
                  <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
                    <div className="relative group/btn">

                      <div className="absolute inset-0 bg-white/10 backdrop-blur-md border border-white/30 rounded-sm shadow-lg" />
                      <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/20 to-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />

                      <div className="relative flex items-center justify-center px-10 py-4 text-white group-hover/btn:text-white transition-all duration-300">
                        <span className="text-xs font-medium uppercase tracking-[0.2em] mr-3">
                          Explore Collection
                        </span>
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>


            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Link href="/products?category=nutraceutical" className="group block">
                <div className="relative aspect-square overflow-hidden bg-background transition-all duration-700 group-hover:shadow-[0_25px_50px_-12px_rgba(139,69,19,0.2)] group-hover:scale-[1.02]">

                  {/* Background Image */}
                  <Image
                    src="/images/nutraceuticals-bg-v3.jpg"
                    alt="Nutraceuticals"
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />

                  {/* Overlays for readability and mood */}
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent opacity-40" />

                  {/* Decorative elements */}
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]" />


                  {/* Content */}
                  <div className="relative h-full flex flex-col justify-end items-center text-center p-8 lg:p-10">
                    <div className="space-y-6 pb-24">
                      <div className="space-y-3">

                        <div className="w-16 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent mx-auto" />

                        <h3 className="font-sans text-3xl lg:text-4xl font-medium text-white tracking-tight leading-tight drop-shadow-lg">
                          Nutraceuticals
                        </h3>
                        <p className="font-sans text-white font-normal leading-relaxed max-w-sm mx-auto text-sm lg:text-base drop-shadow-md">
                          Scientifically-backed supplements for optimal health and vitality.
                        </p>


                        <div className="flex items-center justify-center space-x-2 pt-2">
                          <div className="w-1 h-1 bg-white/80 rounded-full" />
                          <div className="w-2 h-px bg-white/70" />
                          <div className="w-1 h-1 bg-white/80 rounded-full" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Button */}
                  <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
                    <div className="relative group/btn">

                      <div className="absolute inset-0 bg-white/10 backdrop-blur-md border border-white/30 rounded-sm shadow-lg" />
                      <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/20 to-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />

                      <div className="relative flex items-center justify-center px-10 py-4 text-white group-hover/btn:text-white transition-all duration-300">
                        <span className="text-xs font-medium uppercase tracking-[0.2em] mr-3">
                          Explore Collection
                        </span>
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      
      <LifestyleCategoriesCarousel />


      <section className="pt-6 lg:pt-12 pb-12 lg:pb-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-8 px-6 lg:px-12"
          >
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
              <div className="space-y-4">
                <h2 className="text-4xl lg:text-5xl font-extralight text-foreground tracking-tight">
                  Featured
                </h2>
                <p className="text-lg font-light text-secondary max-w-2xl leading-relaxed">
                  A curated selection of our most celebrated formulations, each embodying our
                  commitment to quality and craftsmanship.
                </p>
              </div>

              <Link
                href="/products"
                className="group inline-flex items-center text-foreground hover:text-accent transition-colors duration-300"
              >
                <span className="text-sm font-medium uppercase tracking-[0.15em] mr-3">
                  View All
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 lg:px-12">
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="group cursor-pointer h-full transform scale-[0.8] origin-top"
                >
                  <Link href={`/products/${product.id}`} className="block h-full">
                    <div className="space-y-4 h-full flex flex-col bg-card border border-border overflow-hidden transition-all duration-500 hover:border-[#333333] group-hover:-translate-y-1">
                      <div className="relative aspect-[4/5] bg-muted overflow-hidden">
                        <Image
                          src={
                            getValidImageUrl(product.images?.[0]) ||
                            'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=500&fit=crop&auto=format&q=80&ixlib=rb-4.0.3'
                          }
                          alt={product.name || 'Product'}
                          fill
                          className="object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300" />


                        {product.category && (
                          <div className="absolute top-4 left-4">
                            <span className="bg-[#111111] text-[#FAF9F6] px-3 py-1.5 text-xs uppercase tracking-wider font-bold">
                              {product.category === 'ayurvedic' ? 'Ayurvedic' : 'Nutraceutical'}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="space-y-3 flex-1 pl-5 pr-5 pb-5">
                        <h3 className="text-lg font-light text-foreground group-hover:text-accent transition-colors duration-300 leading-tight">
                          {product.name || 'Untitled Product'}
                        </h3>
                        <p className="text-sm font-light text-muted-foreground line-clamp-2">
                          {product.description || 'No description available'}
                        </p>
                        {(product.average_rating ?? 0) > 0 && (
                          <div className="pt-2 flex items-center gap-1 text-secondary">
                            <span className="text-sm">★</span>
                            <span className="text-sm">{product.average_rating}</span>
                            {(product.total_reviews ?? 0) > 0 && (
                              <span className="text-xs">({product.total_reviews})</span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>


      <section className="relative py-24 lg:py-32 overflow-hidden bg-background">
        {/* Background Image - Watermark */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/images/philosophy-bg-v2.png"
            alt="Philosophy background"
            fill
            className="object-cover opacity-50"
            priority
          />
        </div>

        <div className="relative z-20 container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center space-y-8"
          >
            <div className="space-y-6">
              <p className="text-xs font-medium text-primary/80 uppercase tracking-[0.2em]">
                Our Philosophy
              </p>
              <h2 className="text-4xl lg:text-5xl font-light text-primary/90 leading-tight tracking-tight">
                Formulations
                <br />
                <span className="italic font-light text-accent">rooted in</span>
                <br />
                tradition
              </h2>
              <div className="w-16 h-px bg-primary/30 mx-auto" />
              <p className="text-lg font-light text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Our approach combines ancient Ayurvedic wisdom with contemporary scientific
                understanding, creating formulations that honor both tradition and innovation.
              </p>
            </div>

            <div className="relative inline-block group/btn">
              {/* Glass background layers */}
              <div className="absolute inset-0 bg-white/10 backdrop-blur-md border border-white/30 rounded-sm shadow-lg" />
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/20 to-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />

              {/* Button content */}
              <Link
                href="/about"
                className="relative flex items-center justify-center px-10 py-5 text-primary group-hover/btn:text-primary transition-all duration-300"
              >
                <span className="text-xs font-medium uppercase tracking-[0.2em] mr-3">
                  Learn More
                </span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>


      <section className="py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-16"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-8 h-px bg-accent" />
              <p className="text-xs font-medium text-accent uppercase tracking-[0.3em]">
                Latest Insights
              </p>
              <div className="w-8 h-px bg-accent" />
            </div>
            <h2 className="text-4xl lg:text-5xl font-extralight text-foreground tracking-tight">
              From our
              <span className="block italic font-light text-accent/80 mt-2">knowledge hub</span>
            </h2>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="bg-gray-100 animate-pulse rounded-sm h-96" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 auto-rows-fr">
              {blogPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="h-full"
                >
                  <BlogCard post={post} className="h-full min-h-[28rem]" />
                </motion.div>
              ))}
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground text-sm font-medium uppercase tracking-wider hover:bg-primary/90 transition-colors duration-300"
            >
              View All Articles
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>


      <section className="py-24 lg:py-32 bg-[#FAF9F6]">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-6 mb-8"
          >
            <p className="text-xs font-medium text-accent uppercase tracking-[0.2em]">
              Customer Stories
            </p>
            <h2 className="text-4xl lg:text-5xl font-extralight text-foreground leading-tight tracking-tight">
              What our customers
              <br />
              <span className="italic font-light">are saying</span>
            </h2>
            <div className="w-16 h-px bg-accent mx-auto" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <TestimonialCarousel
              testimonials={[
                {
                  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
                  name: "Priya Sharma",
                  role: "Wellness Enthusiast, Mumbai",
                  review: "These formulations have genuinely transformed my daily wellness routine. The blend of ancient wisdom with modern science is remarkable.",
                },
                {
                  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
                  name: "Rajesh Kumar",
                  role: "Yoga Instructor, Bangalore",
                  review: "I've been using Ayurvedic products for years, but nothing compares to the quality and effectiveness of these formulations.",
                },
                {
                  avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
                  name: "Anita Desai",
                  role: "Holistic Health Practitioner, Delhi",
                  review: "The natural ingredients and traditional formulas have made a noticeable difference in my overall well-being. Highly recommend!",
                },
              ]}
            />
          </motion.div>
        </div>
      </section>


      <section className="py-24 lg:py-32 bg-primary text-primary-foreground">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center space-y-12 px-6 lg:px-12"
          >
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-extralight tracking-tight">Stay Informed</h2>
              <p className="text-lg font-light text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed">
                Subscribe to receive updates on new formulations, insights into our practices, and
                invitations to exclusive events.
              </p>
            </div>

            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 bg-transparent border border-primary-foreground/30 text-primary-foreground placeholder-primary-foreground/60 focus:outline-none focus:border-primary-foreground transition-colors duration-300 text-sm font-light tracking-wide rounded-sm"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-primary-foreground text-primary text-sm font-medium hover:bg-primary-foreground/90 transition-colors duration-300 uppercase tracking-[0.15em] rounded-sm"
              >
                Subscribe
              </button>
            </form>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-8 border-t border-primary-foreground/20">
              <div className="text-center">
                <p className="text-xs font-medium text-primary-foreground/70 uppercase tracking-[0.15em] mb-2">
                  Certified B Corp
                </p>
                <p className="text-sm font-light text-primary-foreground/80">
                  Committed to social and environmental responsibility
                </p>
              </div>

              <div className="w-px h-12 bg-primary-foreground/20 hidden sm:block" />

              <div className="text-center">
                <p className="text-xs font-medium text-primary-foreground/70 uppercase tracking-[0.15em] mb-2">
                  Cruelty Free
                </p>
                <p className="text-sm font-light text-primary-foreground/80">
                  Leaping Bunny certified formulations
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
