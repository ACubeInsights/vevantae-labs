'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ArrowRight, Plus } from 'lucide-react'
import { getProducts, Product } from '@/lib/supabase'

// Helper function to validate and fix image URLs
function getValidImageUrl(imageUrl: string | undefined): string | null {
  if (!imageUrl) return null;
  
  // If it's already a valid URL, return it
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }
  
  // If it's a relative path or invalid, return null to use fallback
  return null;
}

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const products = await getProducts({ is_featured: true });
        // Get first 3 featured products, or fallback to first 3 products
        if (products.length === 0) {
          const allProducts = await getProducts();
          setFeaturedProducts(allProducts.slice(0, 3));
        } else {
          setFeaturedProducts(products.slice(0, 3));
        }
      } catch (error) {
        console.error('Error fetching featured products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const categories = [
    { name: 'Skin Care', count: '24 products', image: 'https://via.placeholder.com/300x300/F8F6F3/8B7355?text=Skin+Care' },
    { name: 'Hand & Body', count: '18 products', image: 'https://via.placeholder.com/300x300/F8F6F3/8B7355?text=Hand+Body' },
    { name: 'Fragrance', count: '12 products', image: 'https://via.placeholder.com/300x300/F8F6F3/8B7355?text=Fragrance' },
    { name: 'Home', count: '8 products', image: 'https://via.placeholder.com/300x300/F8F6F3/8B7355?text=Home' }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 min-h-[85vh]">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="lg:col-span-5 flex flex-col justify-center py-20 lg:py-32 lg:pr-16"
            >
              <div className="space-y-12">
                <div className="space-y-8">
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-accent uppercase tracking-[0.2em] mb-6">
                      New Collection
                    </p>
                    <h1 className="text-5xl lg:text-7xl font-extralight text-foreground leading-[0.9] tracking-tight">
                      Formulations
                      <br />
                      <span className="italic font-light">for the</span>
                      <br />
                      curious
                    </h1>
                  </div>
                  
                  <div className="w-16 h-px bg-accent" />
                  
                  <p className="text-lg font-light text-secondary leading-relaxed max-w-md tracking-wide">
                    Explore our collection of meticulously crafted formulations, 
                    each designed to elevate the everyday ritual.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-6">
                  <Link 
                    href="/products" 
                    className="group inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground text-sm font-medium uppercase tracking-[0.15em] hover:bg-primary/90 transition-all duration-300 shadow-sm"
                  >
                    <span>Discover Collection</span>
                    <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  
                  <Link 
                    href="/about" 
                    className="group inline-flex items-center justify-center px-8 py-4 border border-border text-foreground text-sm font-medium uppercase tracking-[0.15em] hover:border-primary hover:bg-muted/30 transition-all duration-300"
                  >
                    <span>Our Story</span>
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Right Visual */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="lg:col-span-7 relative"
            >
              <div className="relative h-full min-h-[60vh] lg:min-h-[85vh]">
                <div className="absolute inset-0 bg-gradient-to-br from-muted/50 to-muted" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full max-w-lg aspect-[3/4]">
                    <Image
                      src="https://via.placeholder.com/600x800/F8F6F3/8B7355?text=Hero+Image"
                      alt="Featured collection"
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-primary/5" />
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute top-1/4 right-8 w-2 h-2 bg-accent rounded-full animate-pulse" />
                <div className="absolute bottom-1/3 left-8 w-1 h-1 bg-accent rounded-full animate-pulse" style={{animationDelay: '1s'}} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
              <div className="space-y-4">
                <h2 className="text-4xl lg:text-5xl font-extralight text-foreground tracking-tight">
                  Featured
                </h2>
                <p className="text-lg font-light text-secondary max-w-2xl leading-relaxed">
                  A curated selection of our most celebrated formulations, 
                  each embodying our commitment to quality and craftsmanship.
                </p>
              </div>
              
              <Link 
                href="/products" 
                className="group inline-flex items-center text-foreground hover:text-accent transition-colors duration-300"
              >
                <span className="text-sm font-medium uppercase tracking-[0.15em] mr-3">View All</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group cursor-pointer h-full"
              >
                <Link href={`/products/${product.id}`} className="block h-full">
                  <div className="space-y-6 h-full flex flex-col">
                    <div className="relative aspect-[4/5] bg-muted overflow-hidden rounded-sm shadow-sm group-hover:shadow-md transition-shadow duration-300">
                      <Image
                        src={getValidImageUrl(product.images?.[0]) || 'https://via.placeholder.com/400x500/F8F6F3/8B7355?text=Product+Image'}
                        alt={product.name || 'Product'}
                        fill
                        className="object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300" />
                      
                      {/* Category Badge */}
                      {product.category && (
                        <div className="absolute top-4 left-4">
                          <span className="text-xs font-medium text-accent uppercase tracking-[0.15em] bg-card/95 backdrop-blur-sm px-3 py-1.5 rounded-sm shadow-sm">
                            {product.category}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-3 flex-1">
                      <h3 className="text-xl font-light text-foreground group-hover:text-accent transition-colors duration-300 leading-tight">
                        {product.name || 'Untitled Product'}
                      </h3>
                      <p className="text-sm font-light text-muted-foreground leading-relaxed">
                        {product.description || 'No description available'}
                      </p>
                      {product.product_ml && (
                        <p className="text-lg font-medium text-foreground">
                          {product.product_ml}ml
                        </p>
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

      {/* Categories */}
      <section className="py-24 lg:py-32 bg-muted/30">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl lg:text-5xl font-extralight text-foreground mb-6 tracking-tight">
              Categories
            </h2>
            <p className="text-lg font-light text-secondary max-w-2xl mx-auto leading-relaxed">
              Discover our comprehensive range of formulations, 
              organized by purpose and application.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <Link href={`/products?category=${category.name.toLowerCase().replace(' & ', '-')}`} className="block">
                  <div className="space-y-6">
                    <div className="relative aspect-square bg-muted overflow-hidden rounded-sm shadow-sm group-hover:shadow-lg transition-all duration-300">
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />
                      
                      {/* Plus Icon */}
                      <div className="absolute bottom-4 right-4 w-10 h-10 bg-card/95 backdrop-blur-sm flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 rounded-sm shadow-sm">
                        <Plus className="w-5 h-5" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-xl font-light text-foreground group-hover:text-accent transition-colors duration-300">
                        {category.name}
                      </h3>
                      <p className="text-sm font-light text-muted-foreground">
                        {category.count}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left Content */}
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
                  Our approach combines ancient Ayurvedic wisdom with contemporary 
                  scientific understanding, creating formulations that honor both 
                  tradition and innovation.
                </p>
              </div>
              
              <Link 
                href="/about" 
                className="group inline-flex items-center text-foreground hover:text-accent transition-colors duration-300"
              >
                <span className="text-sm font-medium uppercase tracking-[0.15em] mr-3">Learn More</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Right Visual */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative aspect-[4/5] bg-gradient-to-br from-muted/50 to-muted rounded-sm shadow-lg overflow-hidden">
                <Image
                  src="https://via.placeholder.com/600x750/F8F6F3/8B7355?text=About+Image"
                  alt="Our philosophy"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-primary/10" />
                
                {/* Overlay Text */}
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="bg-card/95 backdrop-blur-sm p-6 space-y-3 rounded-sm shadow-lg border border-border/50">
                    <h4 className="text-lg font-light text-foreground">
                      Sustainable Practices
                    </h4>
                    <p className="text-sm font-light text-muted-foreground leading-relaxed">
                      Every formulation reflects our commitment to environmental 
                      responsibility and ethical sourcing.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 lg:py-32 bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center space-y-12"
          >
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-extralight tracking-tight">
                Stay Informed
              </h2>
              <p className="text-lg font-light text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed">
                Subscribe to receive updates on new formulations, insights into our 
                practices, and invitations to exclusive events.
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

      <Footer />
    </div>
  )
}
