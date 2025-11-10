'use client';

import { useEffect, useState } from 'react';

// Force dynamic rendering to avoid build-time issues
export const dynamic = 'force-dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { ArrowRight, Plus } from 'lucide-react';
import { InfiniteSlider } from '@/components/ui/infinite-slider';
import { getProducts, Product, getBlogPosts, BlogPost } from '@/lib/supabase';
import { BlogCard } from '@/components/BlogCard';
import { CertificatesCarousel } from '@/components/CertificatesCarousel';

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
                <div className="space-y-10">
                  <div className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                      className="flex items-center gap-4"
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
                    className="text-lg sm:text-xl font-light text-secondary leading-relaxed max-w-lg tracking-wide"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.3 }}
                  >
                    Explore our collection of meticulously crafted formulations, each designed to
                    elevate the everyday ritual into something extraordinary.
                  </motion.p>
                </div>

                <motion.div
                  className="flex flex-col sm:flex-row gap-6"
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
              className="lg:col-span-6 xl:col-span-7 relative flex items-center justify-center z-5 order-1 lg:order-2 lg:absolute lg:inset-0 lg:w-full lg:h-full"
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
                  
                  <div className="absolute inset-0 bg-gradient-to-br from-accent via-accent/80 to-accent/60" />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent" />

                  
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]" />

                  
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-card/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                  
                  <div className="absolute inset-0 bottom-2/3">
                    <div className="absolute inset-4 border border-card/20 rounded-sm" />
                    <div className="absolute top-6 left-6 w-8 h-8 border-l-2 border-t-2 border-card/30" />
                    <div className="absolute top-6 right-6 w-8 h-8 border-r-2 border-t-2 border-card/30" />
                  </div>

                  
                  <div className="relative h-full flex flex-col justify-end items-center text-center p-8 lg:p-10">
                    <div className="space-y-6 pb-20">
                      <div className="space-y-3">
                        
                        <div className="w-16 h-px bg-gradient-to-r from-transparent via-card/60 to-transparent mx-auto" />

                        <h3 className="text-3xl lg:text-4xl font-thin text-card tracking-[0.02em] leading-tight">
                          <span className="bg-gradient-to-r from-card via-card/95 to-card/90 bg-clip-text text-transparent">
                            Ayurvedic Solutions
                          </span>
                        </h3>
                        <p className="text-card/75 font-light leading-relaxed max-w-sm mx-auto text-sm lg:text-base tracking-wide">
                          Ancient wisdom meets modern science in our traditional formulations.
                        </p>

                        
                        <div className="flex items-center justify-center space-x-2 pt-2">
                          <div className="w-1 h-1 bg-card/40 rounded-full" />
                          <div className="w-2 h-px bg-card/30" />
                          <div className="w-1 h-1 bg-card/40 rounded-full" />
                        </div>
                      </div>
                    </div>
                  </div>

                  
                  <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
                    <div className="relative group/btn">
                      
                      <div className="absolute inset-0 bg-card/10 backdrop-blur-sm border border-card/30 rounded-sm shadow-lg" />
                      <div className="absolute inset-0 bg-gradient-to-r from-card/5 via-card/10 to-card/5 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />

                      <div className="relative flex items-center justify-center px-10 py-4 text-card group-hover/btn:text-card/90 transition-all duration-300">
                        <span className="text-xs font-medium uppercase tracking-[0.2em] mr-3">
                          Explore Collection
                        </span>
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>

                  
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-card/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700"
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              </Link>
            </motion.div>

            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Link href="/products?category=nutraceuticals" className="group block">
                <div className="relative aspect-square overflow-hidden bg-background transition-all duration-700 group-hover:shadow-[0_25px_50px_-12px_rgba(139,69,19,0.2)] group-hover:scale-[1.02]">
                  
                  <div className="absolute inset-0 bg-gradient-to-br from-background via-muted to-muted/80" />
                  <div className="absolute inset-0 bg-gradient-to-t from-accent/10 via-transparent to-transparent" />

                  
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,rgba(139,69,19,0.1)_1px,transparent_1px)] bg-[length:20px_20px]" />

                  
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                  
                  <div className="absolute inset-0 bottom-2/3">
                    <div className="absolute inset-4 border border-accent/40 rounded-sm" />
                    <div className="absolute top-6 left-6 w-8 h-8 border-l-2 border-t-2 border-accent/50" />
                    <div className="absolute top-6 right-6 w-8 h-8 border-r-2 border-t-2 border-accent/50" />
                  </div>

                  
                  <div className="relative h-full flex flex-col justify-end items-center text-center p-8 lg:p-10">
                    <div className="space-y-6 pb-20">
                      <div className="space-y-3">
                        
                        <div className="w-16 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent mx-auto" />

                        <h3 className="text-3xl lg:text-4xl font-thin text-foreground tracking-[0.02em] leading-tight">
                          <span className="bg-gradient-to-r from-accent via-accent/90 to-accent/80 bg-clip-text text-transparent">
                            Nutraceuticals
                          </span>
                        </h3>
                        <p className="text-secondary font-light leading-relaxed max-w-sm mx-auto text-sm lg:text-base tracking-wide">
                          Scientifically-backed supplements for optimal health and vitality.
                        </p>

                        
                        <div className="flex items-center justify-center space-x-2 pt-2">
                          <div className="w-1 h-1 bg-accent/60 rounded-full" />
                          <div className="w-2 h-px bg-accent/50" />
                          <div className="w-1 h-1 bg-accent/60 rounded-full" />
                        </div>
                      </div>
                    </div>
                  </div>

                  
                  <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
                    <div className="relative group/btn">
                      
                      <div className="absolute inset-0 bg-accent/30 backdrop-blur-sm border border-accent/40 rounded-sm shadow-lg" />
                      <div className="absolute inset-0 bg-gradient-to-r from-accent/20 via-accent/30 to-accent/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />

                      <div className="relative flex items-center justify-center px-10 py-4 text-foreground group-hover/btn:text-accent transition-all duration-300">
                        <span className="text-xs font-medium uppercase tracking-[0.2em] mr-3">
                          Explore Collection
                        </span>
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>

                  
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-accent/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700"
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      
      <section className="pt-4 lg:pt-8 pb-8 lg:pb-12 relative overflow-hidden">
        
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/30 to-card/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-muted/20 via-transparent to-background/30" />

        
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23111111' fill-opacity='0.4'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='53' cy='53' r='1'/%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/10 to-transparent animate-pulse" />
        </div>

        
        <div className="absolute inset-0 opacity-[0.02]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, hsl(var(--accent)) 2px, transparent 2px), radial-gradient(circle at 75% 75%, hsl(var(--secondary)) 1px, transparent 1px)`,
              backgroundSize: '80px 80px, 40px 40px',
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="text-center mb-16 lg:mb-20"
          >
            <div className="space-y-4">
              
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-8 h-px bg-accent" />
                <p className="text-xs font-medium text-accent uppercase tracking-[0.3em]">
                  Targeted Solutions
                </p>
                <div className="w-8 h-px bg-accent" />
              </div>

              
              <h2 className="text-4xl lg:text-5xl font-extralight text-foreground tracking-tight">
                Shop by
                <span className="block italic font-light text-accent/80 mt-2">Lifestyle</span>
              </h2>

              
              <p className="text-lg font-light text-secondary max-w-2xl mx-auto leading-relaxed">
                Discover curated wellness solutions tailored to your unique lifestyle needs and
                health aspirations.
              </p>
            </div>
          </motion.div>
        </div>

        
        <div className="relative overflow-hidden py-8">
          <div className="flex animate-scroll hover:pause gap-8 lg:gap-10">
            
            <Link href="/products?health_conditions=joint-pain" className="group flex-shrink-0">
              <div className="w-64 h-64 lg:w-72 lg:h-72 relative overflow-hidden transition-all duration-700 group-hover:-translate-y-2 group-hover:scale-[1.03]">
                
                <div className="absolute inset-0 bg-gradient-to-br from-card via-background to-muted/50" />
                <div className="absolute inset-0 bg-gradient-to-t from-accent/5 via-transparent to-card/30" />

                
                <div className="absolute inset-0 border border-accent/20 group-hover:border-accent/40 transition-all duration-500 backdrop-blur-sm shadow-xl group-hover:shadow-2xl group-hover:shadow-accent/10" />

                
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/5 to-transparent animate-pulse" />
                </div>

                
                <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 lg:p-10 text-center">
                  
                  <div className="relative mb-6 lg:mb-8">
                    <div className="absolute inset-0 bg-accent/10 rounded-full blur-sm scale-110" />
                    <div className="relative w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-accent/20 via-accent/15 to-accent/10 rounded-full flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-accent/30 group-hover:via-accent/25 group-hover:to-accent/15 transition-all duration-500 shadow-lg">
                      <svg
                        className="w-10 h-10 lg:w-12 lg:h-12 text-accent"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M12 2C10.9 2 10 2.9 10 4V6C8.9 6 8 6.9 8 8V10C6.9 10 6 10.9 6 12C6 13.1 6.9 14 8 14V16C8 17.1 8.9 18 10 18V20C10 21.1 10.9 22 12 22C13.1 22 14 21.1 14 20V18C15.1 18 16 17.1 16 16V14C17.1 14 18 13.1 18 12C18 10.9 17.1 10 16 10V8C16 6.9 15.1 6 14 6V4C14 2.9 13.1 2 12 2Z"
                          opacity="0.8"
                        />
                        <circle cx="12" cy="12" r="2" fill="currentColor" />
                      </svg>
                    </div>
                  </div>

                  
                  <div className="space-y-3">
                    <h3 className="text-2xl lg:text-3xl font-light text-foreground tracking-tight leading-tight">
                      Joint Pain
                    </h3>
                    <div className="w-12 h-px bg-accent/30 mx-auto" />
                    <p className="text-base lg:text-lg text-secondary/80 font-light leading-relaxed tracking-wide">
                      Natural relief & joint support
                    </p>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/products?health_conditions=inflammation" className="group flex-shrink-0">
              <div className="w-64 h-64 lg:w-72 lg:h-72 relative overflow-hidden transition-all duration-700 group-hover:-translate-y-2 group-hover:scale-[1.03]">
                
                <div className="absolute inset-0 bg-gradient-to-br from-card via-background to-muted/50" />
                <div className="absolute inset-0 bg-gradient-to-t from-accent/5 via-transparent to-card/30" />

                
                <div className="absolute inset-0 border border-accent/20 group-hover:border-accent/40 transition-all duration-500 backdrop-blur-sm shadow-xl group-hover:shadow-2xl group-hover:shadow-accent/10" />

                
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/5 to-transparent animate-pulse" />
                </div>

                
                <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 lg:p-10 text-center">
                  
                  <div className="relative mb-6 lg:mb-8">
                    <div className="absolute inset-0 bg-accent/10 rounded-full blur-sm scale-110" />
                    <div className="relative w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-accent/20 via-accent/15 to-accent/10 rounded-full flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-accent/30 group-hover:via-accent/25 group-hover:to-accent/15 transition-all duration-500 shadow-lg">
                      <svg
                        className="w-10 h-10 lg:w-12 lg:h-12 text-accent"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M12 2C11.2 2.8 10.5 3.7 10 4.8C9.2 6.4 9 8.1 9.5 9.7C10 11.3 11.1 12.6 12.5 13.3C13.9 14 15.6 14 17 13.3C18.4 12.6 19.5 11.3 20 9.7C20.5 8.1 20.3 6.4 19.5 4.8C19 3.7 18.3 2.8 17.5 2C18.8 3.5 19.5 5.4 19.5 7.5C19.5 11.6 16.1 15 12 15C7.9 15 4.5 11.6 4.5 7.5C4.5 5.4 5.2 3.5 6.5 2Z"
                          opacity="0.9"
                        />
                        <path
                          d="M12 8C10.9 8 10 8.9 10 10C10 11.1 10.9 12 12 12C13.1 12 14 11.1 14 10C14 8.9 13.1 8 12 8Z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                  </div>

                  
                  <div className="space-y-3">
                    <h3 className="text-2xl lg:text-3xl font-light text-foreground tracking-tight leading-tight">
                      Inflammation
                    </h3>
                    <div className="w-12 h-px bg-accent/30 mx-auto" />
                    <p className="text-base lg:text-lg text-secondary/80 font-light leading-relaxed tracking-wide">
                      Natural anti-inflammatory support
                    </p>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/products?health_conditions=low-immunity" className="group flex-shrink-0">
              <div className="w-64 h-64 lg:w-72 lg:h-72 relative overflow-hidden transition-all duration-700 group-hover:-translate-y-2 group-hover:scale-[1.03]">
                
                <div className="absolute inset-0 bg-gradient-to-br from-card via-background to-muted/50" />
                <div className="absolute inset-0 bg-gradient-to-t from-accent/5 via-transparent to-card/30" />

                
                <div className="absolute inset-0 border border-accent/20 group-hover:border-accent/40 transition-all duration-500 backdrop-blur-sm shadow-xl group-hover:shadow-2xl group-hover:shadow-accent/10" />

                
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/5 to-transparent animate-pulse" />
                </div>

                
                <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 lg:p-10 text-center">
                  
                  <div className="relative mb-6 lg:mb-8">
                    <div className="absolute inset-0 bg-accent/10 rounded-full blur-sm scale-110" />
                    <div className="relative w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-accent/20 via-accent/15 to-accent/10 rounded-full flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-accent/30 group-hover:via-accent/25 group-hover:to-accent/15 transition-all duration-500 shadow-lg">
                      <svg
                        className="w-10 h-10 lg:w-12 lg:h-12 text-accent"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z"
                          opacity="0.9"
                        />
                      </svg>
                    </div>
                  </div>

                  
                  <div className="space-y-3">
                    <h3 className="text-2xl lg:text-3xl font-light text-foreground tracking-tight leading-tight">
                      Low Immunity
                    </h3>
                    <div className="w-12 h-px bg-accent/30 mx-auto" />
                    <p className="text-base lg:text-lg text-secondary/80 font-light leading-relaxed tracking-wide">
                      Boost defense & immune system
                    </p>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/products?health_conditions=stress" className="group flex-shrink-0">
              <div className="w-64 h-64 lg:w-72 lg:h-72 relative overflow-hidden transition-all duration-700 group-hover:-translate-y-2 group-hover:scale-[1.03]">
                
                <div className="absolute inset-0 bg-gradient-to-br from-card via-background to-muted/50" />
                <div className="absolute inset-0 bg-gradient-to-t from-accent/5 via-transparent to-card/30" />

                
                <div className="absolute inset-0 border border-accent/20 group-hover:border-accent/40 transition-all duration-500 backdrop-blur-sm shadow-xl group-hover:shadow-2xl group-hover:shadow-accent/10" />

                
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/5 to-transparent animate-pulse" />
                </div>

                
                <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 lg:p-10 text-center">
                  
                  <div className="relative mb-6 lg:mb-8">
                    <div className="absolute inset-0 bg-accent/10 rounded-full blur-sm scale-110" />
                    <div className="relative w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-accent/20 via-accent/15 to-accent/10 rounded-full flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-accent/30 group-hover:via-accent/25 group-hover:to-accent/15 transition-all duration-500 shadow-lg">
                      <svg
                        className="w-10 h-10 lg:w-12 lg:h-12 text-accent"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z"
                          opacity="0.8"
                        />
                        <path
                          d="M12 8C10.9 8 10 8.9 10 10C10 11.1 10.9 12 12 12C13.1 12 14 11.1 14 10C14 8.9 13.1 8 12 8Z"
                          fill="currentColor"
                        />
                        <path
                          d="M12 14C10.9 14 10 14.9 10 16C10 17.1 10.9 18 12 18C13.1 18 14 17.1 14 16C14 14.9 13.1 14 12 14Z"
                          fill="currentColor"
                        />
                        <path
                          d="M12 20C10.9 20 10 20.9 10 22C10 23.1 10.9 24 12 24C13.1 24 14 23.1 14 22C14 20.9 13.1 20 12 20Z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                  </div>

                  
                  <div className="space-y-3">
                    <h3 className="text-2xl lg:text-3xl font-light text-foreground tracking-tight leading-tight">
                      Stress
                    </h3>
                    <div className="w-12 h-px bg-accent/30 mx-auto" />
                    <p className="text-base lg:text-lg text-secondary/80 font-light leading-relaxed tracking-wide">
                      Mental calm & stress management
                    </p>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/products?health_conditions=fatigue" className="group flex-shrink-0">
              <div className="w-64 h-64 lg:w-72 lg:h-72 relative overflow-hidden transition-all duration-700 group-hover:-translate-y-2 group-hover:scale-[1.03]">
                
                <div className="absolute inset-0 bg-gradient-to-br from-card via-background to-muted/50" />
                <div className="absolute inset-0 bg-gradient-to-t from-accent/5 via-transparent to-card/30" />

                
                <div className="absolute inset-0 border border-accent/20 group-hover:border-accent/40 transition-all duration-500 backdrop-blur-sm shadow-xl group-hover:shadow-2xl group-hover:shadow-accent/10" />

                
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/5 to-transparent animate-pulse" />
                </div>

                
                <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 lg:p-10 text-center">
                  
                  <div className="relative mb-6 lg:mb-8">
                    <div className="absolute inset-0 bg-accent/10 rounded-full blur-sm scale-110" />
                    <div className="relative w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-accent/20 via-accent/15 to-accent/10 rounded-full flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-accent/30 group-hover:via-accent/25 group-hover:to-accent/15 transition-all duration-500 shadow-lg">
                      <svg
                        className="w-10 h-10 lg:w-12 lg:h-12 text-accent"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
                          opacity="0.3"
                        />
                        <path
                          d="M12 6C8.69 6 6 8.69 6 12C6 15.31 8.69 18 12 18C15.31 18 18 15.31 18 12C18 8.69 15.31 6 12 6ZM12 16C9.79 16 8 14.21 8 12C8 9.79 9.79 8 12 8C14.21 8 16 9.79 16 12C16 14.21 14.21 16 12 16Z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                  </div>

                  
                  <div className="space-y-3">
                    <h3 className="text-2xl lg:text-3xl font-light text-foreground tracking-tight leading-tight">
                      Fatigue
                    </h3>
                    <div className="w-12 h-px bg-accent/30 mx-auto" />
                    <p className="text-base lg:text-lg text-secondary/80 font-light leading-relaxed tracking-wide">
                      Energy boost & vitality support
                    </p>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/products?health_conditions=sleep-issues" className="group flex-shrink-0">
              <div className="w-64 h-64 lg:w-72 lg:h-72 relative overflow-hidden transition-all duration-700 group-hover:-translate-y-2 group-hover:scale-[1.03]">
                
                <div className="absolute inset-0 bg-gradient-to-br from-card via-background to-muted/50" />
                <div className="absolute inset-0 bg-gradient-to-t from-accent/5 via-transparent to-card/30" />

                
                <div className="absolute inset-0 border border-accent/20 group-hover:border-accent/40 transition-all duration-500 backdrop-blur-sm shadow-xl group-hover:shadow-2xl group-hover:shadow-accent/10" />

                
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/5 to-transparent animate-pulse" />
                </div>

                
                <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 lg:p-10 text-center">
                  
                  <div className="relative mb-6 lg:mb-8">
                    <div className="absolute inset-0 bg-accent/10 rounded-full blur-sm scale-110" />
                    <div className="relative w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-accent/20 via-accent/15 to-accent/10 rounded-full flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-accent/30 group-hover:via-accent/25 group-hover:to-accent/15 transition-all duration-500 shadow-lg">
                      <svg
                        className="w-10 h-10 lg:w-12 lg:h-12 text-accent"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
                          opacity="0.4"
                        />
                        <path
                          d="M12 7C9.24 7 7 9.24 7 12C7 14.76 9.24 17 12 17C14.76 17 17 14.76 17 12C17 9.24 14.76 7 12 7ZM12 15C10.34 15 9 13.66 9 12C9 10.34 10.34 9 12 9C13.66 9 15 10.34 15 12C15 13.66 13.66 15 12 15Z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                  </div>

                  
                  <div className="space-y-3">
                    <h3 className="text-2xl lg:text-3xl font-light text-foreground tracking-tight leading-tight">
                      Sleep Issues
                    </h3>
                    <div className="w-12 h-px bg-accent/30 mx-auto" />
                    <p className="text-base lg:text-lg text-secondary/80 font-light leading-relaxed tracking-wide">
                      Better rest & sleep quality
                    </p>
                  </div>
                </div>
              </div>
            </Link>

            
            <Link href="/products?health_conditions=joint-pain" className="group flex-shrink-0">
              <div className="w-64 h-64 lg:w-72 lg:h-72 relative overflow-hidden transition-all duration-700 group-hover:-translate-y-2 group-hover:scale-[1.03]">
                
                <div className="absolute inset-0 bg-gradient-to-br from-card via-background to-muted/50" />
                <div className="absolute inset-0 bg-gradient-to-t from-accent/5 via-transparent to-card/30" />

                
                <div className="absolute inset-0 border border-accent/20 group-hover:border-accent/40 transition-all duration-500 backdrop-blur-sm shadow-xl group-hover:shadow-2xl group-hover:shadow-accent/10" />

                
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/5 to-transparent animate-pulse" />
                </div>

                
                <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 lg:p-10 text-center">
                  
                  <div className="relative mb-6 lg:mb-8">
                    <div className="absolute inset-0 bg-accent/10 rounded-full blur-sm scale-110" />
                    <div className="relative w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-accent/20 via-accent/15 to-accent/10 rounded-full flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-accent/30 group-hover:via-accent/25 group-hover:to-accent/15 transition-all duration-500 shadow-lg">
                      <svg
                        className="w-10 h-10 lg:w-12 lg:h-12 text-accent"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M12 2C10.9 2 10 2.9 10 4V6C8.9 6 8 6.9 8 8V10C6.9 10 6 10.9 6 12C6 13.1 6.9 14 8 14V16C8 17.1 8.9 18 10 18V20C10 21.1 10.9 22 12 22C13.1 22 14 21.1 14 20V18C15.1 18 16 17.1 16 16V14C17.1 14 18 13.1 18 12C18 10.9 17.1 10 16 10V8C16 6.9 15.1 6 14 6V4C14 2.9 13.1 2 12 2ZM12 4V6H14V8H16V10H18V12H16V14H14V16H12V18H10V16H8V14H6V12H8V10H10V8H12V6H10V4H12Z"
                          opacity="0.8"
                        />
                        <circle cx="12" cy="12" r="2" fill="currentColor" />
                      </svg>
                    </div>
                  </div>

                  
                  <div className="space-y-3">
                    <h3 className="text-2xl lg:text-3xl font-light text-foreground tracking-tight leading-tight">
                      Joint Pain
                    </h3>
                    <div className="w-12 h-px bg-accent/30 mx-auto" />
                    <p className="text-base lg:text-lg text-secondary/80 font-light leading-relaxed tracking-wide">
                      Natural relief & joint support
                    </p>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/products?health_conditions=inflammation" className="group flex-shrink-0">
              <div className="w-64 h-64 lg:w-72 lg:h-72 relative overflow-hidden transition-all duration-700 group-hover:-translate-y-2 group-hover:scale-[1.03]">
                
                <div className="absolute inset-0 bg-gradient-to-br from-card via-background to-muted/50" />
                <div className="absolute inset-0 bg-gradient-to-t from-accent/5 via-transparent to-card/30" />

                
                <div className="absolute inset-0 border border-accent/20 group-hover:border-accent/40 transition-all duration-500 backdrop-blur-sm shadow-xl group-hover:shadow-2xl group-hover:shadow-accent/10" />

                
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/5 to-transparent animate-pulse" />
                </div>

                
                <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 lg:p-10 text-center">
                  
                  <div className="relative mb-6 lg:mb-8">
                    <div className="absolute inset-0 bg-accent/10 rounded-full blur-sm scale-110" />
                    <div className="relative w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-accent/20 via-accent/15 to-accent/10 rounded-full flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-accent/30 group-hover:via-accent/25 group-hover:to-accent/15 transition-all duration-500 shadow-lg">
                      <svg
                        className="w-10 h-10 lg:w-12 lg:h-12 text-accent"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M12 2C11.2 2.8 10.5 3.7 10 4.8C9.2 6.4 9 8.1 9.5 9.7C10 11.3 11.1 12.6 12.5 13.3C13.9 14 15.6 14 17 13.3C18.4 12.6 19.5 11.3 20 9.7C20.5 8.1 20.3 6.4 19.5 4.8C19 3.7 18.3 2.8 17.5 2C18.8 3.5 19.5 5.4 19.5 7.5C19.5 11.6 16.1 15 12 15C7.9 15 4.5 11.6 4.5 7.5C4.5 5.4 5.2 3.5 6.5 2C5.7 2.8 5 3.7 4.5 4.8C3.7 6.4 3.5 8.1 4 9.7C4.5 11.3 5.6 12.6 7 13.3C8.4 14 10.1 14 11.5 13.3C10.1 12.6 9 11.3 8.5 9.7C8 8.1 8.2 6.4 9 4.8C9.5 3.7 10.2 2.8 11 2H12Z"
                          opacity="0.9"
                        />
                        <path
                          d="M12 8C10.9 8 10 8.9 10 10C10 11.1 10.9 12 12 12C13.1 12 14 11.1 14 10C14 8.9 13.1 8 12 8Z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                  </div>

                  
                  <div className="space-y-3">
                    <h3 className="text-2xl lg:text-3xl font-light text-foreground tracking-tight leading-tight">
                      Inflammation
                    </h3>
                    <div className="w-12 h-px bg-accent/30 mx-auto" />
                    <p className="text-base lg:text-lg text-secondary/80 font-light leading-relaxed tracking-wide">
                      Natural anti-inflammatory support
                    </p>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/products?health_conditions=low-immunity" className="group flex-shrink-0">
              <div className="w-64 h-64 lg:w-72 lg:h-72 relative overflow-hidden transition-all duration-700 group-hover:-translate-y-2 group-hover:scale-[1.03]">
                
                <div className="absolute inset-0 bg-gradient-to-br from-card via-background to-muted/50" />
                <div className="absolute inset-0 bg-gradient-to-t from-accent/5 via-transparent to-card/30" />

                
                <div className="absolute inset-0 border border-accent/20 group-hover:border-accent/40 transition-all duration-500 backdrop-blur-sm shadow-xl group-hover:shadow-2xl group-hover:shadow-accent/10" />

                
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/5 to-transparent animate-pulse" />
                </div>

                
                <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 lg:p-10 text-center">
                  
                  <div className="relative mb-6 lg:mb-8">
                    <div className="absolute inset-0 bg-accent/10 rounded-full blur-sm scale-110" />
                    <div className="relative w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-accent/20 via-accent/15 to-accent/10 rounded-full flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-accent/30 group-hover:via-accent/25 group-hover:to-accent/15 transition-all duration-500 shadow-lg">
                      <svg
                        className="w-10 h-10 lg:w-12 lg:h-12 text-accent"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z"
                          opacity="0.9"
                        />
                      </svg>
                    </div>
                  </div>

                  
                  <div className="space-y-3">
                    <h3 className="text-2xl lg:text-3xl font-light text-foreground tracking-tight leading-tight">
                      Low Immunity
                    </h3>
                    <div className="w-12 h-px bg-accent/30 mx-auto" />
                    <p className="text-base lg:text-lg text-secondary/80 font-light leading-relaxed tracking-wide">
                      Boost defense & immune system
                    </p>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/products?health_conditions=stress" className="group flex-shrink-0">
              <div className="w-64 h-64 lg:w-72 lg:h-72 relative overflow-hidden transition-all duration-700 group-hover:-translate-y-2 group-hover:scale-[1.03]">
                
                <div className="absolute inset-0 bg-gradient-to-br from-card via-background to-muted/50" />
                <div className="absolute inset-0 bg-gradient-to-t from-accent/5 via-transparent to-card/30" />

                
                <div className="absolute inset-0 border border-accent/20 group-hover:border-accent/40 transition-all duration-500 backdrop-blur-sm shadow-xl group-hover:shadow-2xl group-hover:shadow-accent/10" />

                
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/5 to-transparent animate-pulse" />
                </div>

                
                <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 lg:p-10 text-center">
                  
                  <div className="relative mb-6 lg:mb-8">
                    <div className="absolute inset-0 bg-accent/10 rounded-full blur-sm scale-110" />
                    <div className="relative w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-accent/20 via-accent/15 to-accent/10 rounded-full flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-accent/30 group-hover:via-accent/25 group-hover:to-accent/15 transition-all duration-500 shadow-lg">
                      <svg
                        className="w-10 h-10 lg:w-12 lg:h-12 text-accent"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z"
                          opacity="0.8"
                        />
                        <path
                          d="M12 8C10.9 8 10 8.9 10 10C10 11.1 10.9 12 12 12C13.1 12 14 11.1 14 10C14 8.9 13.1 8 12 8Z"
                          fill="currentColor"
                        />
                        <path
                          d="M12 14C10.9 14 10 14.9 10 16C10 17.1 10.9 18 12 18C13.1 18 14 17.1 14 16C14 14.9 13.1 14 12 14Z"
                          fill="currentColor"
                        />
                        <path
                          d="M12 20C10.9 20 10 20.9 10 22C10 23.1 10.9 24 12 24C13.1 24 14 23.1 14 22C14 20.9 13.1 20 12 20Z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                  </div>

                  
                  <div className="space-y-3">
                    <h3 className="text-2xl lg:text-3xl font-light text-foreground tracking-tight leading-tight">
                      Stress
                    </h3>
                    <div className="w-12 h-px bg-accent/30 mx-auto" />
                    <p className="text-base lg:text-lg text-secondary/80 font-light leading-relaxed tracking-wide">
                      Mental calm & stress management
                    </p>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/products?health_conditions=fatigue" className="group flex-shrink-0">
              <div className="w-64 h-64 lg:w-72 lg:h-72 relative overflow-hidden transition-all duration-700 group-hover:-translate-y-2 group-hover:scale-[1.03]">
                
                <div className="absolute inset-0 bg-gradient-to-br from-card via-background to-muted/50" />
                <div className="absolute inset-0 bg-gradient-to-t from-accent/5 via-transparent to-card/30" />

                
                <div className="absolute inset-0 border border-accent/20 group-hover:border-accent/40 transition-all duration-500 backdrop-blur-sm shadow-xl group-hover:shadow-2xl group-hover:shadow-accent/10" />

                
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/5 to-transparent animate-pulse" />
                </div>

                
                <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 lg:p-10 text-center">
                  
                  <div className="relative mb-6 lg:mb-8">
                    <div className="absolute inset-0 bg-accent/10 rounded-full blur-sm scale-110" />
                    <div className="relative w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-accent/20 via-accent/15 to-accent/10 rounded-full flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-accent/30 group-hover:via-accent/25 group-hover:to-accent/15 transition-all duration-500 shadow-lg">
                      <svg
                        className="w-10 h-10 lg:w-12 lg:h-12 text-accent"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
                          opacity="0.3"
                        />
                        <path
                          d="M12 6C8.69 6 6 8.69 6 12C6 15.31 8.69 18 12 18C15.31 18 18 15.31 18 12C18 8.69 15.31 6 12 6ZM12 16C9.79 16 8 14.21 8 12C8 9.79 9.79 8 12 8C14.21 8 16 9.79 16 12C16 14.21 14.21 16 12 16Z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                  </div>

                  
                  <div className="space-y-3">
                    <h3 className="text-2xl lg:text-3xl font-light text-foreground tracking-tight leading-tight">
                      Fatigue
                    </h3>
                    <div className="w-12 h-px bg-accent/30 mx-auto" />
                    <p className="text-base lg:text-lg text-secondary/80 font-light leading-relaxed tracking-wide">
                      Energy boost & vitality support
                    </p>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/products?health_conditions=sleep-issues" className="group flex-shrink-0">
              <div className="w-64 h-64 lg:w-72 lg:h-72 relative overflow-hidden transition-all duration-700 group-hover:-translate-y-2 group-hover:scale-[1.03]">
                
                <div className="absolute inset-0 bg-gradient-to-br from-card via-background to-muted/50" />
                <div className="absolute inset-0 bg-gradient-to-t from-accent/5 via-transparent to-card/30" />

                
                <div className="absolute inset-0 border border-accent/20 group-hover:border-accent/40 transition-all duration-500 backdrop-blur-sm shadow-xl group-hover:shadow-2xl group-hover:shadow-accent/10" />

                
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/5 to-transparent animate-pulse" />
                </div>

                
                <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 lg:p-10 text-center">
                  
                  <div className="relative mb-6 lg:mb-8">
                    <div className="absolute inset-0 bg-accent/10 rounded-full blur-sm scale-110" />
                    <div className="relative w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-accent/20 via-accent/15 to-accent/10 rounded-full flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-accent/30 group-hover:via-accent/25 group-hover:to-accent/15 transition-all duration-500 shadow-lg">
                      <svg
                        className="w-10 h-10 lg:w-12 lg:h-12 text-accent"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
                          opacity="0.4"
                        />
                        <path
                          d="M12 7C9.24 7 7 9.24 7 12C7 14.76 9.24 17 12 17C14.76 17 17 14.76 17 12C17 9.24 14.76 7 12 7ZM12 15C10.34 15 9 13.66 9 12C9 10.34 10.34 9 12 9C13.66 9 15 10.34 15 12C15 13.66 13.66 15 12 15Z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                  </div>

                  
                  <div className="space-y-3">
                    <h3 className="text-2xl lg:text-3xl font-light text-foreground tracking-tight leading-tight">
                      Sleep Issues
                    </h3>
                    <div className="w-12 h-px bg-accent/30 mx-auto" />
                    <p className="text-base lg:text-lg text-secondary/80 font-light leading-relaxed tracking-wide">
                      Better rest & sleep quality
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          <style jsx>{`
            @keyframes scroll {
              from {
                transform: translateX(0);
              }
              to {
                transform: translateX(calc(-100% / 2));
              }
            }
            .animate-scroll {
              animation: scroll 30s linear infinite;
              will-change: transform;
              width: max-content;
            }
            .animate-scroll:hover {
              animation-play-state: paused;
            }
          `}</style>
        </div>
      </section>

      
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

      
      <section className="pt-8 lg:pt-12 pb-24 lg:pb-32 bg-background">
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center px-6 lg:px-12">
            
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <p className="text-xs font-medium text-accent uppercase tracking-[0.2em]">
                  Our Philosophy
                </p>
                <h2 className="text-4xl lg:text-5xl font-extralight text-foreground leading-tight tracking-tight">
                  Formulations
                  <br />
                  <span className="italic font-light">rooted in</span>
                  <br />
                  tradition
                </h2>
                <div className="w-16 h-px bg-accent" />
                <p className="text-lg font-light text-secondary leading-relaxed">
                  Our approach combines ancient Ayurvedic wisdom with contemporary scientific
                  understanding, creating formulations that honor both tradition and innovation.
                </p>
              </div>

              <Link
                href="/about"
                className="group inline-flex items-center text-foreground hover:text-accent transition-colors duration-300"
              >
                <span className="text-sm font-medium uppercase tracking-[0.15em] mr-3">
                  Learn More
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative aspect-[4/5] bg-gradient-to-br from-muted/50 to-muted rounded-sm shadow-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&h=750&fit=crop&auto=format&q=80&ixlib=rb-4.0.3"
                  alt="Our philosophy"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-primary/10" />

                
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="bg-black/70 backdrop-blur-sm p-6 space-y-3 rounded-sm shadow-lg">
                    <h4 className="text-lg font-medium text-white">Sustainable Practices</h4>
                    <p className="text-base font-normal text-white/90 leading-relaxed">
                      Every formulation reflects our commitment to environmental responsibility and
                      ethical sourcing.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
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
            className="text-center space-y-6 mb-16"
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

          
          <div className="text-center text-muted-foreground">
            <p>Customer testimonials coming soon...</p>
          </div>
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
