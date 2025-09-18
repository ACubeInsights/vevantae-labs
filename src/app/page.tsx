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
    { name: 'Skin Care', count: '24 products', image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&h=600&fit=crop&auto=format&q=80&ixlib=rb-4.0.3' },
    { name: 'Hand & Body', count: '18 products', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=600&fit=crop&auto=format&q=80&ixlib=rb-4.0.3' },
    { name: 'Fragrance', count: '12 products', image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&h=600&fit=crop&auto=format&q=80&ixlib=rb-4.0.3' },
    { name: 'Home', count: '8 products', image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=600&h=600&fit=crop&auto=format&q=80&ixlib=rb-4.0.3' }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background min-h-screen">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-accent/5" />
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-accent/3 to-muted/10" />
          
          {/* Floating Particles */}
           {[...Array(12)].map((_, i) => {
             // Use deterministic positioning based on index to avoid hydration mismatch
             const positions = [
               { left: 15, top: 20 }, { left: 85, top: 15 }, { left: 25, top: 80 },
               { left: 70, top: 25 }, { left: 45, top: 90 }, { left: 90, top: 60 },
               { left: 10, top: 50 }, { left: 60, top: 10 }, { left: 35, top: 70 },
               { left: 80, top: 85 }, { left: 55, top: 40 }, { left: 20, top: 65 }
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
                   ease: "easeInOut",
                   delay: delays[i],
                 }}
               />
             );
           })}
          
          {/* Geometric Shapes */}
          <motion.div
            className="absolute top-1/4 right-1/4 w-32 h-32 border border-accent/10 rotate-45"
            animate={{ rotate: [45, 135, 45] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute bottom-1/3 left-1/4 w-24 h-24 border border-accent/5 rounded-full"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-20">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 min-h-screen">
             {/* Left Content */}
             <motion.div
               initial={{ opacity: 0, y: 50 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
               className="lg:col-span-5 flex flex-col justify-center py-20 lg:py-32 lg:pr-16 relative z-30"
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
                      className="text-6xl lg:text-8xl font-extralight text-foreground leading-[0.85] tracking-tight"
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
                          animate={{ width: "60%" }}
                          transition={{ duration: 1, delay: 1.5 }}
                        />
                      </motion.span>
                    </motion.h1>
                  </div>
                  
                  <motion.p 
                    className="text-xl font-light text-secondary leading-relaxed max-w-lg tracking-wide"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.3 }}
                  >
                    Explore our collection of meticulously crafted formulations, 
                    each designed to elevate the everyday ritual into something extraordinary.
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
                      initial={{ x: "-100%" }}
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
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    >
                      <Plus className="w-4 h-4" />
                    </motion.div>
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Visual */}
             <motion.div
               initial={{ opacity: 0, x: 50 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 1.4, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
               className="lg:col-span-7 relative flex items-center justify-center z-10"
             >
               <div className="relative h-full min-h-[70vh] lg:min-h-screen w-full">
                 {/* Background Layers */}
                 <motion.div 
                   className="absolute inset-0 bg-gradient-to-br from-muted/30 to-accent/10 rounded-sm"
                   animate={{ 
                     background: [
                       "linear-gradient(135deg, rgba(232, 230, 224, 0.3) 0%, rgba(139, 115, 85, 0.1) 100%)",
                       "linear-gradient(135deg, rgba(139, 115, 85, 0.1) 0%, rgba(232, 230, 224, 0.3) 100%)",
                       "linear-gradient(135deg, rgba(232, 230, 224, 0.3) 0%, rgba(139, 115, 85, 0.1) 100%)"
                     ]
                   }}
                   transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                 />
                 
                 {/* Main Image Container */}
                  <div className="absolute inset-0 flex items-center justify-end pr-0 py-8">
                   <motion.div 
                     className="relative w-full h-full group border-2 border-accent/20 rounded-sm overflow-hidden"
                     whileHover={{ scale: 1.02, borderColor: "rgba(139, 115, 85, 0.4)" }}
                     transition={{ duration: 0.6, ease: "easeOut" }}
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
                      />
                     
                     {/* Overlay Effects */}
                     <motion.div 
                       className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-all duration-700"
                       whileHover={{ 
                         boxShadow: "inset 0 0 0 1px rgba(139, 115, 85, 0.3)"
                       }}
                     />
                     
                     {/* Interactive Elements */}
                     <motion.div
                       className="absolute top-8 right-8 w-3 h-3 bg-accent rounded-full shadow-lg z-20"
                       animate={{ 
                         scale: [1, 1.2, 1],
                         opacity: [0.7, 1, 0.7]
                       }}
                       transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                     />
                     <motion.div
                       className="absolute bottom-12 left-8 w-2 h-2 bg-accent/60 rounded-full z-20"
                       animate={{ 
                         scale: [1, 1.3, 1],
                         opacity: [0.5, 0.8, 0.5]
                       }}
                       transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                     />
                   </motion.div>
                 </div>
                
                {/* Floating Accent Elements */}
                <motion.div
                  className="absolute top-1/4 -right-4 w-16 h-16 border border-accent/20 rounded-full"
                  animate={{ 
                    y: [-10, 10, -10],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute bottom-1/4 -left-4 w-12 h-12 bg-accent/5 rounded-sm"
                  animate={{ 
                    x: [-5, 5, -5],
                    rotate: [0, -90, 0]
                  }}
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                />
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
        >
          <span className="text-xs text-accent uppercase tracking-[0.2em] mb-2">Scroll</span>
          <motion.div
            className="w-px h-8 bg-accent/50"
            animate={{ scaleY: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
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
                        src={getValidImageUrl(product.images?.[0]) || 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=500&fit=crop&auto=format&q=80&ixlib=rb-4.0.3'}
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
                      <div className="absolute bottom-4 right-4 w-10 h-10 bg-card text-foreground backdrop-blur-sm flex items-center justify-center border border-border/70 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 rounded-sm shadow-sm">
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
                  src="https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&h=750&fit=crop&auto=format&q=80&ixlib=rb-4.0.3"
                  alt="Our philosophy"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-primary/10" />
                
                {/* Overlay Text */}
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="bg-black/70 backdrop-blur-sm p-6 space-y-3 rounded-sm shadow-lg">
                    <h4 className="text-lg font-medium text-white">
                      Sustainable Practices
                    </h4>
                    <p className="text-base font-normal text-white/90 leading-relaxed">
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
